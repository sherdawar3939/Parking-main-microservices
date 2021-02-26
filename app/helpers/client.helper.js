'use strict'
const { any } = require('bluebird')
const _ = require('lodash')
var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalMiddleware = require('../middlewares/general.middleware')

const getClientList = (conditions) => {
  const where = {}
  const contractWhere = {}
  const zipCodeWhere = {}
  if (conditions.zipCode) {
    zipCodeWhere.zipCode = conditions.zipCode
  }

  if (conditions.status) {
    contractWhere.status = conditions.status
  }

  if (conditions.search) {
    where[Op.or] = {
      companyName: { [Op.like]: '%' + conditions.search + '%' },
      phone: { [Op.like]: '%' + conditions.search + '%' },
      email: { [Op.like]: '%' + conditions.search + '%' }
    }
  }
  console.log(zipCodeWhere)
  return db.Client.findAll({
    where,
    order: [
      ['id', 'ASC']
    ],
    include: [
      {
        model: db.ClientZipCode,
        as: 'clientZipCodes',
        where: {
          isDeleted: false
        },
        include: [{
          where: zipCodeWhere,
          model: db.ZipCode,
          as: 'zipCodes'
        }]

      },
      {
        where: contractWhere,
        model: db.Contract,
        as: 'clientContracts',
        attributes: ['id', 'data', 'status']
      }
    ]

  })
}

const getClientDetail = (id) => {
  return db.Client.findOne({

    where: {
      id
    },
    attributes: ['id', 'companyName', 'email', 'phone', 'iban', 'secondaryPhone', 'secondaryEmail', 'secondaryContactPersonName', 'address', 'balance'],
    include: [{
      model: db.ClientZipCode,
      as: 'clientZipCodes',
      attributes: ['clientId'],
      where: {
        isDeleted: false
      },
      include: [{
        model: db.ZipCode,
        as: 'zipCodes',
        attributes: ['zipCode'],
        include: [{
          model: db.City,
          as: 'cityZipCodes',
          attributes: ['name'],
          include: [{
            model: db.Country,
            as: 'countryCities',
            attributes: ['name']
          }]

        }]
      }]
    }, {
      model: db.ParkingZone,
      as: 'clientParkingZones'
    }
    ]

  })
}
const postClient = async (body, res, next) => {
  const errorsArray = []
  const client = await db.Client.findOne({
    where: {
      [Op.or]: [
        {
          email: body.email
        }, {
          phone: body.phone
        }
      ]
    }
  })

  if (!client) {
    return db.Client.create(body)
  } else {
    if (client.phone === body.phone) {
      // user phone already exist.

      errorsArray.push({
        field: 'phone',
        error: 1500,
        message: 'phone already exist'
      })
    }

    if (client.email === body.email) {
      // user email already exist.
      errorsArray.push({
        field: 'email',
        error: 1505,
        message: 'email already exist'
      })
    }
    if (!_.isEmpty(errorsArray)) {
      return generalMiddleware.standardErrorResponse(res, errorsArray, 'client.helper.postClient')
    }
  }
  next()
}

const updateClient = async (id, body, res, next) => {
  const errorsArray = []
  console.log(id, '   ', body)
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
  console.log(client)
  if (!client) {
    return db.Client.update(body, {
      where: { id }
    })
  } else {
    if (client.phone === body.phone) {
      // user phone already exist.

      errorsArray.push({
        field: 'phone',
        error: 1500,
        message: 'phone already exist'
      })
    }

    if (client.email === body.email) {
      // user email already exist.
      errorsArray.push({
        field: 'email',
        error: 1505,
        message: 'email already exist'
      })
    }

    if (client.secondaryEmail === body.secondaryEmail) {
      // user email already exist.
      errorsArray.push({
        field: 'secondaryEmail',
        error: 1506,
        message: 'secondaryEmail already exist'
      })
    }

    if (client.secondaryPhone === body.secondaryPhone) {
      // user email already exist.
      errorsArray.push({
        field: 'secondaryPhone',
        error: 1506,
        message: 'secondaryPhone already exist'
      })
    }
  }
  if (!_.isEmpty(errorsArray)) {
    return generalMiddleware.standardErrorResponse(res, errorsArray, 'client.helper.postClient')
  }
  next()
}
module.exports = {
  getClientList,
  getClientDetail,
  postClient,
  updateClient
}
