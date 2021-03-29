'use strict'
const _ = require('lodash')
var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalMiddleware = require('../middlewares/general.middleware')
const generalHelpingMethods = require('../helpers/general.helper')
const fs = require('fs')
const generalHelper = require('./general.helper')
// Get Client List
const getClientList = (conditions) => {
  const where = {}
  const contractWhere = {}
  if (conditions.status) {
    contractWhere.status = conditions.status
  }

  if (conditions.UserId) {
    where.UserId = conditions.UserId
  }

  if (conditions.search) {
    where[Op.or] = {
      companyName: { [Op.like]: '%' + conditions.search + '%' },
      phone: { [Op.like]: '%' + conditions.search + '%' },
      email: { [Op.like]: '%' + conditions.search + '%' }
    }
  }
  return db.Client.findAll({
    where,
    order: [
      ['id', 'ASC']
    ],
    include: [
      {
        where: contractWhere,
        model: db.Contract,
        as: 'clientContracts',
        attributes: ['id', 'data', 'status']
      }
    ]

  })
}

// Get Client Details
const getClientDetail = (id) => {
  return db.Client.findOne({

    where: {
      id
    },
    attributes: ['id', 'companyName', 'email', 'phone', 'iban', 'secondaryPhone', 'secondaryEmail', 'secondaryContactPersonName', 'address', 'balance'],
    include: [
      {
        model: db.ParkingZone,
        as: 'parkingZoneClient'
      }
    ]

  })
}

// Create Client API
const postClient = (body, files, uid) => {
  const contract = {}
  return db.Client.findOne({
    where: {
      [Op.or]: [
        {
          email: body.email
        }, {
          phone: body.phone
        }
      ]
    }
  }).then(async client => {
    if (!client) {
      return db.Client.create(body)
    }

    if (client.phone === body.phone) {
      await fs.unlinkSync(files.files[0].path)
      return generalHelpingMethods.rejectPromise([{
        field: 'phone',
        error: 'HPC-0002',
        message: 'Phone already exist '
      }])
    }
    if (client.email === body.email) {
      // user email already exist.
      await fs.unlinkSync(files.files[0].path)
      return generalHelpingMethods.rejectPromise([{
        field: 'Email',
        error: 'HPC-0001',
        message: 'Email already exist '
      }])
    }
  }).then(async createdClient => {
    const client = JSON.stringify(createdClient)
    contract.data = client
    contract.uid = uid
    contract.UserId = body.UserId
    contract.ClientId = createdClient.dataValues.id
    contract.contractUrl = files.files[0].filename
    await db.Contract.create(contract)
    contract.uid = 'I-001'
    contract.contractUrl = `${Date.now()}-I-001.pdf`
    await generalHelper.generateContractOne(contract.contractUrl)
    await db.Contract.create(contract)
    contract.uid = 'IV-001'
    contract.contractUrl = `${Date.now()}-IV-001.pdf`
    const countryName = await db.Country.findOne({ raw: true, where: { id: body.CountryId }, attributes: ['name'] })
    await generalHelper.generateContractTwo(contract.contractUrl, countryName.name)
    return db.Contract.create(contract)
  })
    .catch(generalHelpingMethods.catchException)
}

// Update Client API
const updateClient = async (id, body, res, next) => {
  const errorsArray = []
  const client = await db.Client.findOne({
    where: {
      id: {
        [Op.ne]: id
      },
      [Op.or]: [
        {
          email: body.email
        }, {
          phone: body.phone
        },
        {
          secondaryEmail: body.secondaryEmail
        },
        {
          secondaryPhone: body.secondaryPhone
        }
      ]
    }
  })
  if (!client) {
    return db.Client.update(body, {
      where: { id }
    })
  } else {
    if (client.phone === body.phone) {
      // user phone already exist.

      errorsArray.push({
        field: 'phone',
        error: 'HUC-0003',
        message: 'phone already exist'
      })
    }

    if (client.email === body.email) {
      // user email already exist.
      errorsArray.push({
        field: 'email',
        error: 'HUC-0004',
        message: 'email already exist'
      })
    }

    if (client.secondaryEmail === body.secondaryEmail) {
      // user email already exist.
      errorsArray.push({
        field: 'secondaryEmail',
        error: 'HUC-0005',
        message: 'secondaryEmail already exist'
      })
    }

    if (client.secondaryPhone === body.secondaryPhone) {
      // user email already exist.
      errorsArray.push({
        field: 'secondaryPhone',
        error: 'HUC-0006',
        message: 'secondaryPhone already exist'
      })
    }
  }
  if (!_.isEmpty(errorsArray)) {
    return generalMiddleware.standardErrorResponse(res, errorsArray, 'client.helper.postClient')
  }
  next()
}
const clientZipCodeHelper = (id) => {
  return db.ClientZipCode.findAll({
    // raw: true,
    where: {
      ClientId: id,
      isDeleted: false
    },
    attributes: ['id'],
    include: [{
      model: db.ZipCode,
      as: 'zipCodes',
      attributes: ['id', 'zipCode']

    }
    ]

  })
}
module.exports = {
  getClientList,
  getClientDetail,
  postClient,
  updateClient,
  clientZipCodeHelper
}
