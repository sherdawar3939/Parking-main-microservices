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
  return db.UserVehicle.create({ licensePlate: data.licensePlate, quantity: data.quantity, VehicleCategoryId: data.VehicleCategoryId })
}
function updateUserVehicle (data, id) {
  return db.UserVehicle.update({ licensePlate: data.licensePlate }, {
    where: {
      id
    }
  })
}
function deleteUserVehicle (id) {
  return db.UserVehicle.update({ isDeleted: true }, {
    where: {
      id
    }
  })
}
module.exports = {
  getUserVehicle,
  addUserVehicle,
  updateUserVehicle,
  deleteUserVehicle
}
