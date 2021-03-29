'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

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
      error: 'MVCPZ-8080',
      message: 'Please provide only valid \'days\' as string, length must be between 2 and 20.'
    })
  }

  // fee must be required required  Validating as not empty, valid String and length range.
  if (isNaN(body.fee) || body.fee < 0 || body.fee > 100) {
    errorArray.push({
      field: 'fee',
      error: 'MVCPZ-8081',
      message: 'Please provide only valid \'fee\' as integer, length must be between 2 and 20.'
    })
  }

  // licensePlate must be required required  Validating as not empty, valid String and length range.
  if (isNaN(body.maxTime) || body.maxTime.length < 0) {
    errorArray.push({
      field: 'maxTime',
      error: 'MVCPZ-8082',
      message: 'Please provide only valid \'maxTime\' as integer, length must be between 2 and 20.'
    })
  }

  // zip must be required required  Validating as not empty, valid integer.
  if (!body.zip || isNaN(body.zip)) {
    errorArray.push({
      field: 'zip',
      error: 'MVCPZ-8083',
      message: 'Please provide only valid \'zip\' as numeric, length must be between 0 and 5.'
    })
  }
  // polygones must be required required  Validating as not empty, valid integer.
  if (body.hasOwnProperty('polygons') && body.polygons) {
    if (!_.isArray(body.polygons) || body.polygons.length < 1) {
      errorArray.push({
        field: 'polygons',
        error: 'MVCPZ-8084',
        message: 'Please provide only valid \'polygons\' as numeric.'
      })
    }
  }
  // validating as required number field
  if (!body.CityId || isNaN(body.CityId)) {
    errorArray.push({
      field: 'CityId',
      error: 'MVCPZ-8085',
      message: 'The CityId is required .'
    })
  }
  // validating as required number field
  if (!body.startTime) {
    errorArray.push({
      field: 'startTime',
      error: 'MVCPZ-8086',
      message: 'The startTime is required .'
    })
  }
  if (!body.endTime) {
    errorArray.push({
      field: 'endTime',
      error: 'MVCPZ-8087',
      message: 'The endTime is required .'
    })
  }

  // validating as optional number field
  if (body.hasOwnProperty('creativesQuantity') && body.creativesQuantity) {
    if (isNaN(body.creativesQuantity) || body.creativesQuantity < 1 || body.creativesQuantity > 999999999) {
      errorArray.push({
        field: 'creativesQuantity',
        error: 'CVP-005',
        message: 'The creativesQuantity should be number with min 1 and max 999999999 value.'
      })
    }
    validatedBody.creativesQuantity = body.creativesQuantity
  }

  // validating Holidays Array as optional number field
  if (body.hasOwnProperty('holidays') && body.holidays) {
    if (!_.isArray(body.holidays) || body.holidays.length < 1) {
      errorArray.push({
        field: 'holidays ',
        error: 90131,
        message: 'Please provide only valid \'holidays \' as Array.'
      })
    }
    validatedBody.holidays = body.holidays
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parkingZone.middleware.validateUpdateParkingZone')
  }
  var date = new Date()
  date.setDate(date.getDate() + 15)
  validatedBody.days = body.days.join(', ')
  validatedBody.fee = body.fee
  validatedBody.maxTime = body.maxTime
  validatedBody.zip = body.zip
  validatedBody.polygons = body.polygons
  validatedBody.lat = body.polygons[0].lat
  validatedBody.lng = body.polygons[0].lng
  validatedBody.CityId = body.CityId
  validatedBody.startTime = body.startTime
  validatedBody.endTime = body.endTime
  validatedBody.activeAfter = date
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

  if (req.user && req.user.RoleId === 3 && req.user.id) {
    validatedConditions.status = 'Active'
    validatedConditions.activeAfter = true
  } else if (query.hasOwnProperty('status' && query.status)) {
    validatedConditions.status = query.status
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
  req.validatedConditions = validatedConditions
  done()
}

const validateGetParkingZoneId = (req, res, done) => {
  const errorArray = []
  const params = req.params
  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVGPZ-8080',
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
  // console.log(body)
  // days must be required required  Validating as not empty, valid String and length range.
  // validating as optional string field
  if (!req.params.id || isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVUPZ-8080',
      message: 'Please provide only valid \'id\' as numeric,.'
    })
  }

  if (body.hasOwnProperty('days') && body.days) {
    if (!body.days) {
      errorArray.push({
        field: 'days',
        error: 'MVUPZ-8081',
        message: 'Please provide only valid \'days\' as string.'
      })
    }
    validatedBody.days = body.days.join(', ')
  }
  // fee must be required required  Validating as not empty, valid String and length range.
  if (body.hasOwnProperty('fee') && body.fee) {
    if (isNaN(body.fee) || body.fee.length < 1 || body.fee.length > 20) {
      errorArray.push({
        field: 'fee',
        error: 'MVUPZ-8082',
        message: 'Please provide only valid \'fee\' as integer, length must be between 2 and 20.'
      })
    }
    validatedBody.fee = body.fee
  }
  // licensePlate must be required required  Validating as not empty, valid String and length range.
  if (body.hasOwnProperty('maxTime') && body.maxTime) {
    if (isNaN(body.maxTime) || body.maxTime.length < 1 || body.maxTime.length > 20) {
      errorArray.push({
        field: 'maxTime',
        error: 'MVUPZ-8083',
        message: 'Please provide only valid \'maxTime\' as integer, length must be between 2 and 20.'
      })
    }
    validatedBody.maxTime = body.maxTime
  }

  // polygones must be required required  Validating as not empty, valid integer.

  if (body.hasOwnProperty('polygons') && body.polygons) {
    if (!body.polygons) {
      errorArray.push({
        field: 'polygons',
        error: 'MVUPZ-8085',
        message: 'Please provide only valid \'polygons\' as numeric.'
      })
    }
    validatedBody.polygons = JSON.stringify(body.polygons)
  }

  if (body.hasOwnProperty('startTime') && body.startTime) {
    if (!body.startTime) {
      errorArray.push({
        field: 'startTime',
        error: 'MVUPZ-8087',
        message: 'The startTime is required .'
      })
    }
    validatedBody.startTime = body.startTime
  }

  if (body.hasOwnProperty('endTime') && body.endTime) {
    if (!body.endTime) {
      errorArray.push({
        field: 'endTime',
        error: 'MVUPZ-8088',
        message: 'The endTime is required .'
      })
    }
    validatedBody.endTime = body.endTime
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parkingZone.middleware.validateUpdateParkingZone')
  }
  req.validatedBody = validatedBody
  done()
}

module.exports = {
  validateCreateParkingZone,
  validateGetParkingZone,
  validateGetParkingZoneId,
  validateUpdateParkingZone
}
