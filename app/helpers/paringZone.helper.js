'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('./general.helper')
function getparkingZone (conditions, limit, offset) {
  return db.ParkingZone.findAll({
    where: conditions,
    order: [
      ['id', 'DESC']
    ],
    limit: limit,
    offset: offset
  })
}
module.exports = {
  getparkingZone
}
