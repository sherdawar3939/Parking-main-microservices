'use strict'

const db = require('../config/sequelize.config')
// fetch banners
function getUserVehicle (conditions) {
  conditions.isDeleted = false
  return db.UserVehicle.findAll({
    include: {
      model: db.VehicleCategory,
      as: 'userVehicleCategory',
      attributes: ['id', 'name']
    },
    where: conditions
  })
}

function addUserVehicle (data) {
  return db.UserVehicle.create(data)
}

function updateUserVehicle (id, data) {
  return db.UserVehicle.update(data, {
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
