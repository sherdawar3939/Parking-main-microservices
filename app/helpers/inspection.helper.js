'use strict'
const db = require('../config/sequelize.config')

/** Fetch Parking Status */
function ParkingStatusInspection (conditions) {
  const where = {}
  if (conditions.licensePlate) {
    where.licensePlate = conditions.licensePlate
  }

  return db.Inspection.findAll({
    where,
    include: [{
      model: db.Parking,
      as: 'parkingInspections',
      attributes: ['status']
      //   where: {}
    }]
  })
}
module.exports = {
  ParkingStatusInspection
}
