'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const { isString, isInteger } = require('lodash')
// const { DECIMAL, DOUBLE } = require('sequelize/types')
const validateCreateParking = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}
  if (!body.status || !isString(body.status)) {
    errorArray.push({
      field: 'status',
      error: 26,
      message: 'Please provide only valid \'status\' as string.'
    })
  }
  if (!body.totalSeconds) {
    errorArray.push({
      field: 'totalSeconds',
      error: 26,
      message: 'Please provide only valid \'totalSeconds\' as string.'
    })
  }
  if (!body.quantity || !isInteger(body.quantity)) {
    errorArray.push({
      field: 'quantity',
      error: 26,
      message: 'Please provide only valid \'quantity\' as Integer.'
    })
  }
  if (!body.licensePlate || !isString(body.licensePlate)) {
    errorArray.push({
      field: 'licensePlate',
      error: 26,
      message: 'Please provide only valid \'licensePlate\' as string.'
    })
  }

  if (!body.parkingCharges || !isInteger(body.parkingCharges)) {
    errorArray.push({
      field: 'parkingCharges',
      error: 26,
      message: 'Please provide only valid \'parkingCharges\' as Decimal.'
    })
  }
  if (!body.profit || !isInteger(body.profit)) {
    errorArray.push({
      field: 'profit',
      error: 26,
      message: 'Please provide only valid \'profit\' as Decimal.'
    })
  }
  if (!body.total || !isInteger(body.total)) {
    errorArray.push({
      field: 'total',
      error: 26,
      message: 'Please provide only valid \'total\' as Decimal.'
    })
  }
  if (!body.paymentId || !isString(body.paymentId)) {
    errorArray.push({
      field: 'paymentId',
      error: 26,
      message: 'Please provide only valid \'paymentId\' as String.'
    })
  }
  if (!body.PayerID || !isString(body.PayerID)) {
    errorArray.push({
      field: 'PayerID',
      error: 26,
      message: 'Please provide only valid \'PayerID\' as String.'
    })
  }
  if (!body.paymentStatus || !isString(body.paymentStatus)) {
    errorArray.push({
      field: 'paymentStatus',
      error: 26,
      message: 'Please provide only valid \'paymentStatus\' as String.'
    })
  }
  if (!body.ParkingZoneId || !isInteger(body.ParkingZoneId)) {
    errorArray.push({
      field: 'ParkingZoneId',
      error: 26,
      message: 'Please provide only valid \'ParkingZoneId\' as Integer.'
    })
  }
  if (!body.UserId || !isInteger(body.UserId)) {
    errorArray.push({
      field: 'UserId',
      error: 26,
      message: 'Please provide only valid \'UserId\' as Integer.'
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
  validatedBody.status = body.status
  validatedBody.totalSeconds = body.totalSeconds
  validatedBody.quantity = body.quantity
  validatedBody.licensePlate = body.licensePlate
  validatedBody.parkingCharges = body.parkingCharges
  validatedBody.profit = body.profit
  validatedBody.total = body.total
  validatedBody.paymentId = body.paymentId
  validatedBody.PayerID = body.PayerID
  validatedBody.paymentStatus = body.paymentStatus
  validatedBody.ParkingZoneId = body.ParkingZoneId
  validatedBody.UserId = body.UserId
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

module.exports = {
  validateCreateParking,
  validateGetParkingList
}
