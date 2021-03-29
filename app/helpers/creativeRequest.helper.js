'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalHelper = require('./general.helper')

/** Create Creative Requests */
const createRequest = async (data) => {
  data.uid = await generalHelper.getUid('CreativeRequest', 'uid', {}, 'CR')
  return db.CreativeRequest.create(data)
}

function getCreatives (id) {
  return db.CreativeRequest.findOne({
    where: {
      id
    },
    include: [{
      model: db.Client,
      as: 'CreativeRequestClient',
      include: [{
        model: db.ParkingZone,
        as: 'parkingZoneClient'
      }]
    }]

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

  if (conditions.ParkingZoneId) {
    where.ParkingZoneId = conditions.ParkingZoneId
  }

  if (conditions.search) {
    where[Op.or] = {
      uid: {
        [Op.like]: '%' + conditions.search + '%'
      },
      status: {
        [Op.like]: '%' + conditions.search + '%'
      },
      qty: {
        [Op.like]: '%' + conditions.search + '%'
      }
    }
  }

  return db.CreativeRequest.findAndCountAll({
    where,
    limit: limit,
    offset: offset,
    include: [{
      model: db.Client,
      as: 'CreativeRequestClient'
    }]
  })
}

const updateCreativeRequest = (id, data) => {
  return db.CreativeRequest.update(data, {
    where: {
      id
    }
  })
}

module.exports = {
  createRequest,
  getRequestList,
  getCreatives,
  updateCreativeRequest
}
