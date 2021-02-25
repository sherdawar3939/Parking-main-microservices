'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
// const _ = require('lodash')

/** Create Creative Requests */
function createRequest (data) {
  return db.CreativeRequest.findOne()
    .then((result) => {
      let foundUid = result.uid

      data.uid = foundUid + 1

      return db.createRequest.create(data)
    })
}

/** Fetch Creative Request List */
function getRequestList (conditions, limit, offset) {
  const where = {}

  if (conditions.ClientId) {
    where.ClientId = conditions.ClientId
  }

  if (conditions.status) {
    where.status = conditions.status
  }
  if (conditions.search) {
    where[Op.or] = {
      uid: { [Op.like]: '%' + conditions.search + '%' },
      status: { [Op.like]: '%' + conditions.search + '%' },
      qty: { [Op.like]: '%' + conditions.search + '%' }
    }
  }

  return db.CreativeRequest.findAndCountAll({
    // raw: true,
    // nest: false,
    where,
    limit: limit,
    offset: offset,
    include: [{
      model: db.Client,
      as: 'creativeRequestClient'
    }]
  })
}

module.exports = {
  createRequest,
  getRequestList
}
