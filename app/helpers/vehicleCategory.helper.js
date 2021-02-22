'use strict'
const db = require('../config/sequelize.config')

// fetch VehicleCategory
function getVehicleCategory (conditions) {
  return db.VehicleCategory.findAll({
    where: conditions
  })
}

module.exports = {
  getVehicleCategory
}
