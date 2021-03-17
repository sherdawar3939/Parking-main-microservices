'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const { isInteger } = require('lodash')

const validateCreateParkingZone = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}
  if (req.user && req.user.RoleId === 2 && req.user.employeeId) {
    validatedBody.ClientId = req.user.employeeId
  }
  // days must be required required  Validating as not empty, valid String and length range.
  if (!body.days || !body.days.length) {
    errorArray.push({
      field: 'days',
      error: 25,
      message: 'Please provide only valid \'days\' as string, length must be between 2 and 20.'
    })
  }

  // fee must be required required  Validating as not empty, valid String and length range.
  if (!isInteger(body.fee) || body.fee.length < 0 || body.fee.length > 20) {
    errorArray.push({
      field: 'fee',
      error: 25,
      message: 'Please provide only valid \'fee\' as integer, length must be between 2 and 20.'
    })
  }
  // licensePlate must be required required  Validating as not empty, valid String and length range.
  if (!isInteger(body.maxTime) || body.maxTime.length < 0 || body.maxTime.length > 20) {
    errorArray.push({
      field: 'maxTime',
      error: 25,
      message: 'Please provide only valid \'maxTime\' as integer, length must be between 2 and 20.'
    })
  }
  // zip must be required required  Validating as not empty, valid integer.
  if (!body.zip || isNaN(body.zip)) {
    errorArray.push({
      field: 'zip',
      error: 26,
      message: 'Please provide only valid \'zip\' as numeric, length must be between 0 and 5.'
    })
  }
  // polygones must be required required  Validating as not empty, valid integer.
  if (!body.polygons) {
    errorArray.push({
      field: 'polygons',
      error: 26,
      message: 'Please provide only valid \'polygons\' as numeric.'
    })
  }

  if (!body.ClientZipCodeId || isNaN(body.ClientZipCodeId)) {
    errorArray.push({
      field: 'ClientZipCodeId',
      error: 26,
      message: 'Please provide only valid \'ClientZipCodeId\' as numeric'
    })
  }
  // validating as required number field
  if (!body.CityId || isNaN(body.CityId)) {
    errorArray.push({
      field: 'CityId',
      error: 234,
      message: 'The CityId is required .'
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parkingZone.middleware.validateUpdateParkingZone')
  }
  validatedBody.days = body.days.join(', ')
  validatedBody.fee = body.fee
  validatedBody.maxTime = body.maxTime
  validatedBody.zip = body.zip
  validatedBody.polygons = body.polygons
  validatedBody.ClientZipCodeId = body.ClientZipCodeId
  validatedBody.CityId = body.CityId
  req.validatedBody = validatedBody
  done()
}

const validateGetParkingZone = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0
  if (req.user && req.user.RoleId === 2 && req.user.employeeId) {
    validatedConditions.ClientId = req.user.employeeId
  } else if (query.hasOwnProperty('ClientId') && query.ClientId && !isNaN(query.ClientId)) {
    validatedConditions.ClientId = query.ClientId
  }
  // validating as optional string field
  if (query.hasOwnProperty('search') && query.search) {
    validatedConditions.search = query.search
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

const validateUpdateParkingZone = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // uid must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.uid) || body.uid.length < 5 || body.uid.length > 10) {
    errorArray.push({
      field: 'uid',
      error: 25,
      message: 'Please provide only valid \'uid\' as string, length must be between 5 and 10.'
    })
  }
  // days must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.days) || body.days.length < 2 || body.days.length > 20) {
    errorArray.push({
      field: 'days',
      error: 25,
      message: 'Please provide only valid \'days\' as string, length must be between 2 and 20.'
    })
  }
  // fee must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.fee) || body.fee.length < 2 || body.fee.length > 20) {
    errorArray.push({
      field: 'fee',
      error: 25,
      message: 'Please provide only valid \'fee\' as string, length must be between 2 and 20.'
    })
  }
  // licensePlate must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.maxTime) || body.maxTime.length < 2 || body.maxTime.length > 20) {
    errorArray.push({
      field: 'maxTime',
      error: 25,
      message: 'Please provide only valid \'maxTime\' as string, length must be between 2 and 20.'
    })
  }
  // zip must be required required  Validating as not empty, valid integer.
  if (!body.zip || isNaN(body.zip)) {
    errorArray.push({
      field: 'zip',
      error: 26,
      message: 'Please provide only valid \'zip\' as numeric, length must be between 0 and 5.'
    })
  }
  // polygones must be required required  Validating as not empty, valid integer.
  if (!body.polygons || isNaN(body.polygons)) {
    errorArray.push({
      field: 'polygons',
      error: 26,
      message: 'Please provide only valid \'polygons\' as numeric.'
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parkingZone.middleware.validateUpdateParkingZone')
  }
  validatedBody.uid = body.uid
  validatedBody.days = body.days
  validatedBody.fee = body.fee
  validatedBody.maxTime = body.maxTime
  validatedBody.zip = body.zip
  validatedBody.polygons = body.polygons

  req.validatedBody = validatedBody
  done()
}

module.exports = {
  validateCreateParkingZone,
  validateGetParkingZone,
  validateGetParkingZoneId,
  validateUpdateParkingZone
}
