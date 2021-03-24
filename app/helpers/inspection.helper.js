'use strict'

// var Sequelize = require('sequelize')
// const Op = Sequelize.Op
const db = require('../config/sequelize.config')
// const _ = require('lodash')

/** Fetch Creative Request List */
function ActiveParkingStatusHelper (conditions, limit, offset) {
  let parkingWhere = {}
  const parkingZoneWhere = {}
  let includes = [{
    where: parkingZoneWhere,
    model: db.Inspection,
    as: 'Inspection',
    attributes: ['uid', 'fee', 'zip']
  }]

  if (conditions.startedOn) {
    parkingWhere.startedOn = conditions.startedOn
  }

  console.log('include', includes)
  return db.Inspection.findAll({
    where: parkingWhere,
    limit: limit,
    offset: offset,
    include: includes
  })
}
module.exports = {
  ActiveParkingStatusHelper
}
