'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateCreateParking = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  validatedBody.UserId = req.user.id

  if (!body.ParkingZoneId || isNaN(body.ParkingZoneId)) {
    errorArray.push({
      field: 'ParkingZoneId',
      error: 'MVCP-8060',
      message: 'Please provide only valid \'ParkingZoneId\' as Integer.'
    })
  }

  if (!body.licensePlate || body.licensePlate.length > 20 || body.licensePlate.length < 2) {
    errorArray.push({
      field: 'licensePlate',
      error: 26,
      message: 'Please provide only valid \'licensePlate\'.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parking.middleware.validateCreateParking')
  }

  validatedBody.ParkingZoneId = body.ParkingZoneId
  validatedBody.licensePlate = body.licensePlate
  req.validatedBody = validatedBody
  done()
}

const validateGetParkingList = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  if (query.hasOwnProperty('search') && query.search) {
    validatedConditions.search = query.search
  }
  if (query.hasOwnProperty('status') && query.status) {
    validatedConditions.status = query.status
  }
  if (req.user && req.user.RoleId === 2 && req.user.employeeId) {
    validatedConditions.ClientId = req.user.employeeId
  } else if (query.hasOwnProperty('ClientId') && query.ClientId) {
    validatedConditions.ClientId = query.ClientId
  }
  if (query.hasOwnProperty('VehicleCategoryId') && query.VehicleCategoryId) {
    validatedConditions.VehicleCategoryId = query.VehicleCategoryId
  }

  if (query.hasOwnProperty('ParkingZoneId') && query.ParkingZoneId) {
    validatedConditions.ParkingZoneId = query.ParkingZoneId
  }

  if (query.hasOwnProperty('UserId') && query.UserId) {
    validatedConditions.UserId = query.UserId
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

  if (!body.id || isNaN(body.id)) {
    errorArray.push({
      field: 'id',
      error: 26,
      message: 'Please provide only valid \'ParkinId\' as Integer.'
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parking.middleware.validateEndParking')
  }

  validatedBody.id = body.id
  req.validatedBody = validatedBody
  done()
}

const validateVerifyPayment = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  if (!body.ParkingId || isNaN(body.ParkingId)) {
    errorArray.push({
      field: 'id',
      error: 'MVP-001',
      message: 'Please provide only valid \'ParkingId\' as Integer.'
    })
  }

  if (!body.PayerID) {
    errorArray.push({
      field: 'id',
      error: 'MVP-005',
      message: 'Please provide only valid \'PayerID\'.'
    })
  }

  if (!body.paymentId) {
    errorArray.push({
      field: 'id',
      error: 'MVP-010',
      message: 'Please provide only valid \'paymentId\'.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parking.middleware.validateVerifyPayment')
  }

  validatedBody.ParkingId = body.ParkingId
  validatedBody.PayerID = body.PayerID
  validatedBody.paymentId = body.paymentId
  req.validatedBody = validatedBody
  done()
}

module.exports = {
  validateCreateParking,
  validateGetParkingList,
  validateEndParking,
  validateVerifyPayment
}
