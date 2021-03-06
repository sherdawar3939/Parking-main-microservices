'use strict'
const db = require('../config/sequelize.config')
// const Sequelize = require('sequelize')
const generalHelpingMethods = require('../helpers/general.helper')

const addContract = (data) => {
<<<<<<< HEAD
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
=======
    console.log(data)
    let client = {}
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
>>>>>>> dev

        return db.Contract.create(contract)
    })
}

<<<<<<< HEAD
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
=======
function getContractList(conditions, limit, offset) {
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
            as: 'clientContracts',
            include: [{
                model: db.ClientZipCode,
                as: 'clientZipCodes',
                attributes: [
                    [Sequelize.fn('COUNT', Sequelize.col('clientZipCodes.ClientId')), 'ZipCodeCount']
                ],
                where: {
                    isDeleted: false
                }
            }]
        }],
        limit: limit,
        offset: offset
    })
>>>>>>> dev
}

function getContract(id) {
    return db.Contract.findOne({ where: { id: id } })
}

function verifyContract(id) {
    return db.Contract.update({ status: 'APPROVED' }, { where: id })
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
module.exports = {
    addContract,
    getContractList,
    verifyContract,
    getApprovedContract,
    getContract
}