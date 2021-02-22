'use strict'
const db = require('../config/sequelize.config')

// fetch VehicleCategory
function getVehicleCategory (conditions) {
  return db.VehicleCategory.findAll({
    where: conditions

  })
}

// Delete VehicleCategory
function deleteVehicleCategory (id) {
  return db.VehicleCategory.update({ isDeleted: true }, {
    where: { id }
  })
}

function createCategoryVehicle (data) {
  return db.VehicleCategory.create(data)
}

module.exports = {
  deleteVehicleCategory,
  getVehicleCategory,
  createCategoryVehicle
}
