'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const _ = require('lodash')

// fetch banners
function getVehicleCategory (conditions) {
  return db.VehicleCategory.findAll({
    where: conditions
  })
}

module.exports = {
  getVehicleCategory
}
