'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('./general.helper')
// fetch banners
function getUserVehicle (conditions) {
  return db.UserVehicle.findAll({
    where: conditions
  })
}
function addUserVehicle (data) {
  return db.UserVehicle.create({ licensePlate: `${data.licensePlate}`, quantity: `${data.quantity}`, VehicleCategoryId: `${data.VehicleCategoryId}` })
}
function updateUserVehicle (data, id) {
  const userVehicle = db.UserVehicle.update({ licensePlate: `${data.licensePlate}` }, {
    where: {
      id: id
    }
  })
  return userVehicle
}
module.exports = {
  getUserVehicle,
  addUserVehicle,
  updateUserVehicle
}
