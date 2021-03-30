'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// Validate Get Inspection of Inspector
const validateGetInspection = (req, res, done) => {
  const errorArray = []
  const validatedConditions = {}
  const query = req.query

  if (req.user && req.user.RoleId === 3 && req.user.id) {
    validatedConditions.InspectorId = req.user.id
  } else if (query.hasOwnProperty('InspectorId') && query.InspectorId && !isNaN(query.InspectorId)) {
    validatedConditions.InspectorId = query.InspectorId
  }

  // ParkingZoneId optional and Numeric
  if (query.hasOwnProperty('ParkingZoneId') && query.ParkingZoneId && !isNaN(query.ParkingZoneId)) {
    validatedConditions.ParkingZoneId = query.ParkingZoneId
  }

  // validating as optional number field
  if (query.hasOwnProperty('result')) {
    validatedConditions.result = query.result
  }

  // ClientId optional and Numeric
  if (query.hasOwnProperty('ClientId') && query.ClientId && !isNaN(query.ClientId)) {
    validatedConditions.ClientId = query.ClientId
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
  const validatedConditions = {}
  if (req.user && req.user.id) {
    validatedConditions.InspectorId = req.user.id
  }
  //  licence Plate must be  required  Validating as not empty, valid string.
  if (body.hasOwnProperty('licensePlate') && body.licensePlate) {
    if (!_.isString(body.licensePlate)) {
      errorArray.push({
        field: 'licensePlate',
        error: 'MVCPZ-8084',
        message: 'Please provide only valid \'licensePlate\' as string.'
      })
    }
  }
  //  lat  must be  required  Validating as not empty, valid number.
  if (body.hasOwnProperty('lat') && body.lat) {
    if (isNaN(body.lat)) {
      errorArray.push({
        field: 'lat',
        error: 'MVCPZ-8084',
        message: 'Please provide only valid \'lat\' as number.'
      })
    }
  }
  //  lng  must be  required  Validating as not empty, valid number.
  if (body.hasOwnProperty('lng') && body.lng) {
    if (isNaN(body.lng)) {
      errorArray.push({
        field: 'lng',
        error: 'MVCPZ-8084',
        message: 'Please provide only valid \'lng\' as number.'
      })
    }
  }

  // validating ParkingZoneId  as optional number field
  if (body.hasOwnProperty('ParkingZoneId') && body.ParkingZoneId) {
    if (isNaN(body.ParkingZoneId)) {
      errorArray.push({
        field: 'ParkingZoneId ',
        error: 90131,
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
module.exports = { validateGetInspection, validatePostInspection }
