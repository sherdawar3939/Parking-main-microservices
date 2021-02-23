'use strict'
const db = require('../config/sequelize.config')

// fetch VehicleCategory
function getVehicleCategory (conditions) {
  return db.VehicleCategory.findAll({
    where: conditions,
    isDeleted: false
  })
}

// Delete VehicleCategory
function deleteVehicleCategory (id) {
  return db.VehicleCategory.update({ isDeleted: true }, {
    where: { id }
  })
}

module.exports = {
  getVehicleCategory,
  deleteVehicleCategory
}
