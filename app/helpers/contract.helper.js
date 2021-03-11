'use strict'
const db = require('../config/sequelize.config')
// const Sequelize = require('sequelize')
const generalHelpingMethods = require('../helpers/general.helper')

const addContract = (data) => {
  console.log(data)
  let client = {}
  const contract = {}
  const whereZipCodes = {}
  whereZipCodes.id = data.zipCode

  return db.Client.findOne({
    raw: true,
    where: {
      UserId: data.UserId
    }
  }).then(_client => {
    if (!_client) {
      return generalHelpingMethods.rejectPromise([{
        field: 'createContract',
        error: 1540,
        message: 'no record found'
      }])
    }
    client = _client
    contract.ClientId = _client.id

    return db.ZipCode.findAll({
      where: whereZipCodes
    })
  }).then((zipCodes) => {
    client.zipCodes = zipCodes
    client = JSON.stringify(client)
    contract.data = client
    contract.UserId = data.UserId

    return db.Contract.create(contract)
  })
}

function getContractList (conditions, limit, offset) {
  let where = {}
  if (conditions.id) {
    where.id = conditions.id
  }
  if (conditions.ClientId) {
    where.ClientId = conditions.ClientId
  }
  if (conditions.status) {
    where.status = conditions.status
  }
  return db.Contract.findAll({
    where,
    include: [{
      model: db.Client,
      as: 'clientContracts'
    }],
    limit: limit,
    offset: offset
  })
}

function getContract (id) {
  return db.Contract.findOne({ where: { id: id } })
}

const verifyContract = (id) => {
  return db.Contract.update({ status: 'APPROVED' }, { where: { id: id } })
    .then(contract => {
      if (contract) {
        db.Contract.findOne({ raw: true, where: { id: id } })
          .then(con => {
            const data = JSON.parse(con.data)
            data.zipCodes.map(item => {
              db.ClientZipCode.create({ ZipCodeId: item.id, ClientId: data.id })
                .then(res => {
                  console.log(res)
                })
              console.log('zip', item.id, data.id)
            })
          })
      }
    })
}
const getApprovedContract = (id) => {
  console.log('clientId ', id)
  return db.Contract.findOne({
    where: {
      ClientId: id,
      status: 'APPROVED'
    }
  })
}
const uploadFilesHelper = (file, id) => {
  try {
    console.log(file)

    if (file === undefined) {
      return (`You must select a file.`)
    }
    return db.Contract.update({ imageUrl: file.path },
      {
        where: {
          id
        }
      }
    )
  } catch (error) {
    return (`Error when trying upload images: ${error}`)
  }
}
module.exports = {
  addContract,
  getContractList,
  verifyContract,
  getApprovedContract,
  getContract,
  uploadFilesHelper
}
