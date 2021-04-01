'use strict'
const db = require('../config/sequelize.config')
const Op = db.Sequelize.Op
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
  let includes = []
  const inspectionWhere = {}
  const inspectorWhere = {}

  if (conditions.ClientId) {
    inspectorWhere.ClientId = conditions.ClientId
  }

  if (conditions.InspectorId) {
    inspectionWhere.InspectorId = conditions.InspectorId
  }

  if (conditions.ParkingZoneId) {
    inspectionWhere.ParkingZoneId = conditions.ParkingZoneId
  }

  if (conditions.result) {
    inspectionWhere.result = conditions.result
  }

  if (conditions.fromDate && conditions.toDate) {
    inspectionWhere[Op.and] = [
      [sequelize.where(sequelize.fn('date', sequelize.col('Inspection.createdAt')), '>=', conditions.fromDate)],
      [sequelize.where(sequelize.fn('date', sequelize.col('Inspection.createdAt')), '<=', conditions.toDate)]
    ]
  } else if (conditions.fromDate) {
    inspectionWhere[Op.and] = [sequelize.Where(sequelize.fn('date', sequelize.col('Inspection.createdAt')), '>=', conditions.fromDate)]
  } else if (conditions.toDate) {
    inspectionWhere[Op.and] = [sequelize.Where(sequelize.fn('date', sequelize.col('Inspection.createdAt')), '<=', conditions.toDate)]
  }

  includes.push({
    model: db.Inspector,
    as: 'inspector',
    inspectorWhere,
    include: [{
      model: db.User,
      as: 'userInspector',
      attributes: ['id', 'fName', 'lName', 'email']
    }]
  })

  // includes.push({
  //   model: db.ParkingZone,
  //   as: 'inspectedParkingZone',
  //   attributes: ['id', 'uid'],
  //   required: false
  // })

  return db.Inspection.findAndCountAll({
    inspectionWhere,
    include: includes,
    limit: limit,
    offset: offset
  })
}
module.exports = { getInspectionHelper, ParkingStatusInspection }
