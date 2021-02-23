'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')

function getparkingZone (conditions, limit, offset) {
  const where = {}

  if (conditions.ClientId) {
    where.ClientId = conditions.ClientId
  }

  if (conditions.CityId) {
    where.CityId = conditions.CityId
  }

  if (conditions.search) {
    where[[Op.or]] = {
      days: {
        [Op.like]: '%' + conditions.search + '%'
      },
      zip: {
        [Op.like]: '%' + conditions.search + '%'
      }
    }
  }
  return db.ParkingZone.findAll({
    where,
    order: [
      ['id', 'DESC']
    ],
    limit: limit,
    offset: offset
  })
}
const getParkingZoneId = (id) => {
  return db.ParkingZone.findAll({
    where: {
      id
    }
  })
}
module.exports = {
  getparkingZone,
  getParkingZoneId
}
