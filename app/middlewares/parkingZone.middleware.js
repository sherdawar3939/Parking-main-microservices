'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const validateGetParkingZone = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  // validating as optional string field
  if (query.hasOwnProperty('search') && query.search) {
    validatedConditions.search = query.search
  }

  // validating as optional number field
  if (query.hasOwnProperty('ClientId') && query.ClientId && !isNaN(query.ClientId)) {
    validatedConditions.ClientId = query.ClientId
  }

  // validating as optional number field
  if (query.hasOwnProperty('CityId') && query.CityId && !isNaN(query.CityId)) {
    validatedConditions.CityId = query.CityId
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

const validateGetParkingZoneId = (req, res, done) => {
  const errorArray = []
  const params = req.params
  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 80140,
      message: 'Please provide only valid \'Parking_Zone id\' as numeric.'
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parkingZone.middleware.getZipCode')
  }
  done()
}

module.exports = {
  validateGetParkingZone,
  validateGetParkingZoneId
}
