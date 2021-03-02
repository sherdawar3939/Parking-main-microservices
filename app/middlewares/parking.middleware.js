'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const { isInteger } = require('lodash')
// const { DECIMAL, DOUBLE } = require('sequelize/types')
const validateCreateParking = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  if (!body.ParkingZoneId || !isInteger(body.ParkingZoneId)) {
    errorArray.push({
      field: 'ParkingZoneId',
      error: 26,
      message: 'Please provide only valid \'ParkingZoneId\' as Integer.'
    })
  }

  if (!body.UserVehicleId || !isInteger(body.UserVehicleId)) {
    errorArray.push({
      field: 'UserVehicleId',
      error: 26,
      message: 'Please provide only valid \'UserVehicleId\' as Integer.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parking.middleware.validateCreateParking')
  }

  validatedBody.ParkingZoneId = body.ParkingZoneId
  validatedBody.UserVehicleId = body.UserVehicleId
  req.validatedBody = validatedBody
  done()
}

const validateGetParkingList = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  if (query.hasOwnProperty('status') && query.status) {
    validatedConditions.status = query.status
  }
  if (query.hasOwnProperty('ClientId') && query.ClientId) {
    validatedConditions.ClientId = query.ClientId
  }
  if (query.hasOwnProperty('VehicleCategoryId') && query.VehicleCategoryId) {
    validatedConditions.VehicleCategoryId = query.VehicleCategoryId
  }

  if (query.hasOwnProperty('ParkingZoneId') && query.ParkingZoneId) {
    validatedConditions.ParkingZoneId = query.ParkingZoneId
  }

  if (query.limit && query.limit > 0) {
    limit = parseInt(query.limit)
  }

  if (query.offset && query.offset > 0) {
    offset = parseInt(query.offset)
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parking.middleware.validateGetParkingList')
  }

  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}
const validateEndParking = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  if (!body.id || !isInteger(body.id)) {
    errorArray.push({
      field: 'id',
      error: 26,
      message: 'Please provide only valid \'ParkinId\' as Integer.'
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parking.middleware.validateCreateParking')
  }

  validatedBody.id = body.id
  req.validatedBody = validatedBody
  done()
}
module.exports = {
  validateCreateParking,
  validateGetParkingList,
  validateEndParking
}
