'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('./general.helper')
// fetch banners
function getparkingZone (conditions) {
  return db.ParkingZone.findAll({
    where: conditions
  })
}
module.exports = {
  getparkingZone
}
