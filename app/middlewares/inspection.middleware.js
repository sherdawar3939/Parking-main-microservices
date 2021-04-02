'use strict'
const generalMiddleware = require('./general.middleware')
var sequelize = require('sequelize')
const Op = sequelize.Op
const _ = require('lodash')

// Validate Get Inspection of Inspector
const validateGetTodayInspectionCount = (req, res, done) => {
  const errorArray = []
  const validatedConditions = {}
  const query = req.query

  if (req.user.RoleId && req.user.RoleId == 4) {
    validatedConditions.InspectorId = req.user.employeeId
  } else if (query.hasOwnProperty('InspectorId') && query.InspectorId) {
    if (isNaN(query.InspectorId) || query.InspectorId < 0 || query.InspectorId > 9999999999) {
      errorArray.push({
        field: 'InspectorId',
        error: 'MGTIC-005',
        message: 'The InspectorId should be number with min 0 and max 9999999999 value.'
      })
    }
    validatedConditions.InspectorId = query.InspectorId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'inspection.middleware.validateGetTodayInspectionCount')
  }

  const TODAY_START = new Date().setHours(0, 0, 0, 0)
  const NOW = new Date()

  validatedConditions.createdAt = {
    [Op.gt]: TODAY_START,
    [Op.lt]: NOW
  }

  req.conditions = validatedConditions
  done()
}

// Validate Get Inspection of Inspector
const validateGetInspection = (req, res, done) => {
  const errorArray = []
  const validatedConditions = {}
  const query = req.query

  if (req.user && req.user.RoleId === 4 && req.user.employeeId) {
    validatedConditions.InspectorId = req.user.employeeId
  } else if (query.hasOwnProperty('InspectorId') && query.InspectorId && !isNaN(query.InspectorId)) {
    validatedConditions.InspectorId = query.InspectorId
  }

  if (req.user && req.user.RoleId === 2 && req.user.employeeId) {
    validatedConditions.ClientId = req.user.employeeId
  } else if (query.hasOwnProperty('ClientId') && query.ClientId && !isNaN(query.ClientId)) {
    validatedConditions.ClientId = query.ClientId
  }

  // ParkingZoneId optional and Numeric
  if (query.hasOwnProperty('ParkingZoneId') && query.ParkingZoneId && !isNaN(query.ParkingZoneId)) {
    validatedConditions.ParkingZoneId = query.ParkingZoneId
  }

  // validating as optional number field
  if (query.hasOwnProperty('result')) {
    validatedConditions.result = query.result
  }

  if (query.hasOwnProperty('licensePlate') && query.licensePlate) {
    validatedConditions.licensePlate = query.licensePlate
  }

  if (query.hasOwnProperty('fromDate') && query.fromDate) {
    validatedConditions.fromDate = query.fromDate
  }

  if (query.hasOwnProperty('toDate') && query.toDate) {
    validatedConditions.toDate = query.toDate
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'inspection.middleware.validateGetInspection')
  }

  req.conditions = validatedConditions
  req.limit = query.limit && query.limit > 0 ? parseInt(query.limit) : 20
  req.offset = query.offset && query.offset > 0 ? parseInt(query.offset) : 0

  done()
}

const validatePostInspection = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  if (!req.user || !req.user.RoleId || req.user.RoleId !== 4) {
    errorArray.push({
      field: 'licensePlate',
      error: 'MVCI-0005',
      message: 'You are not allowed to create inspection.'
    })
  } else {
    validatedBody.InspectorId = req.user.employeeId
  }

  //  licence Plate must be  required  Validating as not empty, valid string.
  if (body.hasOwnProperty('licensePlate') && body.licensePlate) {
    if (!_.isString(body.licensePlate)) {
      errorArray.push({
        field: 'licensePlate',
        error: 'MVCI-0010',
        message: 'Please provide only valid \'licensePlate\' as string.'
      })
    }
  }

  //  lat  must be  required  Validating as not empty, valid number.
  if (body.hasOwnProperty('lat') && body.lat) {
    if (isNaN(body.lat)) {
      errorArray.push({
        field: 'lat',
        error: 'MVCI-0015',
        message: 'Please provide only valid \'lat\' as number.'
      })
    }
  }
  //  lng  must be  required  Validating as not empty, valid number.
  if (body.hasOwnProperty('lng') && body.lng) {
    if (isNaN(body.lng)) {
      errorArray.push({
        field: 'lng',
        error: 'MVCI-0020',
        message: 'Please provide only valid \'lng\' as number.'
      })
    }
  }

  // validating ParkingZoneId  as optional number field
  if (body.hasOwnProperty('ParkingZoneId') && body.ParkingZoneId) {
    if (isNaN(body.ParkingZoneId)) {
      errorArray.push({
        field: 'ParkingZoneId ',
        error: 'MVCI-0025',
        message: 'Please provide only valid \'ParkingZoneId \' as number.'
      })
    }
    validatedBody.ParkingZoneId = body.ParkingZoneId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'inspection.middleware.validatePostIspection')
  }
  validatedBody.licensePlate = body.licensePlate
  validatedBody.lat = body.lat
  validatedBody.lng = body.lng
  validatedBody.ParkingZoneId = body.ParkingZoneId
  req.validatedBody = validatedBody
  done()
}
module.exports = { validateGetInspection, validateGetTodayInspectionCount, validatePostInspection }
