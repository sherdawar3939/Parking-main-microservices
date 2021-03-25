'use strict'
const db = require('../config/sequelize.config')

/** Fetch Creative Request List */
function ParkingStatusInspection (conditions) {
  const where = {}
  if (conditions.startedOn) {
    where.startedOn = conditions.startedOn
  }

  return db.Inspection.findOne({
    where,
    include: [{
      model: db.Parking,
      as: 'parkingInspections'
      //   attributes: ['status']
      //   where: {}
    }]
  })
}
module.exports = {
  ParkingStatusInspection
}
