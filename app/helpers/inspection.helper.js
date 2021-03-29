'use strict'
const db = require('../config/sequelize.config')
var sequelize = require('sequelize')

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

// Fetch Inspection
function getInspectionHelper (conditions, limit, offset) {
  let Where = {}
  const inspectionWhere = {}

  if (conditions.ClientId) {
    inspectionWhere.ClientId = conditions.ClientId
  }

  let includes = [{
    model: db.Inspector,
    as: 'Inspections',
    where: inspectionWhere
  }]

  if (conditions.InspectorId) {
    Where.InspectorId = conditions.InspectorId
  }

  if (conditions.ParkingZoneId) {
    Where.ParkingZoneId = conditions.ParkingZoneId
  }

  if (conditions.result) {
    Where.result = conditions.result
  }
  if (conditions.fromDate) {
    Where = [sequelize.Where(sequelize.fn('date', sequelize.col('Inspection.createdAt')), '>=', conditions.fromDate)]
  }
  if (conditions.toDate) {
    Where = [sequelize.Where(sequelize.fn('date', sequelize.col('Inspection.createdAt')), '<=', conditions.toDate)]
  }
  if (conditions.fromDate && conditions.toDate) {
    Where = {
      [Op.and]: [
        [sequelize.where(sequelize.fn('date', sequelize.col('Inspection.createdAt')), '>=', conditions.fromDate)],
        [sequelize.where(sequelize.fn('date', sequelize.col('Inspection.createdAt')), '<=', conditions.toDate)]
      ]
    }
  }

  console.log('include', includes)
  return db.Inspection.findAndCountAll({
    where: Where,
    include: [{
      model: db.Inspector,
      as: 'Inspections',
      where: inspectionWhere
    }],
    limit: limit,
    offset: offset
  })
}
module.exports = { getInspectionHelper, ParkingStatusInspection }
