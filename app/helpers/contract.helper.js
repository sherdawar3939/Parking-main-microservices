'use strict'
const db = require('../config/sequelize.config')
const Sequelize = require('sequelize')
const { response } = require('express')
const contract = {}

const addContract = (data) => {
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
  return db.Contract.findAll({
    where: conditions,
    nest: false,
    raw: true,
    include: {
      model: db.Client,
      as: 'clientContracts'
    },
    limit: limit,
    offset: offset
  })
}

function getContract (id) {
  return db.Contract.findOne({ where: { id: id } })
}

function verifyContract (id) {
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
  getContract }
