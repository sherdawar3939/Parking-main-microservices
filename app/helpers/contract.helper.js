'use strict'
const db = require('../config/sequelize.config')
const Sequelize = require('sequelize')

function addContract (data) {
  return db.Contract.create(data)
}

function getContractList (conditions, limit, offset) {
  // let includes = [{
  //   model: db.ClientZipCode,
  //   as: 'clientZipCodes',
  //   attributes: [[Sequelize.fn('COUNT', Sequelize.col('clientZipCodes.ClientId')), 'ZipCodeCount']],
  //   where: {
  //     isDeleted: false
  //   }
  // }]
  // let where = {}
  // if (conditions.id) {
  //   where.id = conditions.id
  // }
  // if (conditions.ClientId) {
  //   where.ClientId = conditions.ClientId
  // }
  // if (conditions.status) {
  //   where.status = conditions.status
  // }

  return db.Contract.findAll({
    where: { id: conditions.ClientId },
    // includes: includes,
    // nest: false,
    // raw: true,
    include: [{
      model: db.Client,
      as: 'clientContracts',
      include: [{
        model: db.ClientZipCode,
        as: 'clientZipCodes',
        attributes: [[Sequelize.fn('COUNT', Sequelize.col('clientZipCodes.ClientId')), 'ZipCodeCount']],
        where: {
          isDeleted: false
        }
      }]
    }],
    limit: limit,
    offset: offset
  })
}

function getContract (id) {
  return db.Contract.findOne({ where: { id: id } })
}

function getContractById (id) {
  let includes = [{
    model: db.ClientZipCode,
    as: 'clientZipCodes',
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('clientZipCodes.ClientId')), 'ZipCodeCount']],
    where: {
      isDeleted: false
    }
  }]
  return db.Contract.findAll({
    where: {
      ClientId: id
    },
    includes: includes,
    include: [{
      model: db.Client,
      as: 'clientContracts'
      // attributes: [[Sequelize.fn('COUNT', Sequelize.col('clientContracts.id')), 'clientCount']]
    }],
    group: ['ClientId']
  }
  )
}

function verifyContract (id) {
  return db.Contract.update({ status: 'APPROVED' }, { where: id })
}
module.exports = {
  addContract,
  getContractList,
  verifyContract,
  getContractById,
  getContract }
