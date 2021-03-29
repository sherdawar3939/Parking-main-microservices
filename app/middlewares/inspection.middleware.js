'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// Validate Get parking status
const validateGetParkingStatus = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  if (query.hasOwnProperty('licensePlate') && query.licensePlate) {
    validatedConditions.licensePlate = query.licensePlate
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'inspection.middleware.validateGetParkingStatus')
  }

  req.conditions = validatedConditions

  done()
}

// Validate Get Inspection of Inspector
const validateGetInspection = (req, res, done) => {
  const errorArray = []
  const validatedConditions = {}
  const query = req.query

  let limit = 50
  let offset = 0
  console.log(req.user.id)

  if (req.user && req.user.RoleId === 3 && req.user.id) {
    validatedConditions.InspectorId = req.user.id
  } else if (query.hasOwnProperty('InspectorId') && query.InspectorId && isNaN(query.InspectorId)) {
    validatedConditions.InspectorId = query.InspectorId
  }

  // ParkingZoneId optional and Numeric
  if (query.hasOwnProperty('ParkingZoneId') && query.ParkingZoneId && isNaN(query.ParkingZoneId)) {
    validatedConditions.ParkingZoneId = query.ParkingZoneId
  }

  // validating as optional number field
  if (query.hasOwnProperty('result')) {
    validatedConditions.result = query.result
  }
  // ClientId optional and Numeric
  if (query.hasOwnProperty('ClientId') && query.ClientId && isNaN(query.ClientId)) {
    validatedConditions.ClientId = query.ClientId
  }
  if (query.hasOwnProperty('fromDate') && query.fromDate) {
    validatedConditions.fromDate = query.fromDate
  }
  if (query.hasOwnProperty('toDate') && query.toDate) {
    validatedConditions.toDate = query.toDate
  }
  if (query.limit && query.limit > 0) {
    limit = parseInt(query.limit)
  }

  if (query.offset && query.offset > 0) {
    offset = parseInt(query.offset)
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validateGetParkingZone')
  }
  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset

  done()
}
module.exports = { validateGetInspection, validateGetParkingStatus }
