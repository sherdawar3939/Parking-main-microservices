'use strict'
const db = require('../config/sequelize.config')
const Sequelize = require('sequelize')

function addContract (data) {
  return db.Contract.create(data)
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
