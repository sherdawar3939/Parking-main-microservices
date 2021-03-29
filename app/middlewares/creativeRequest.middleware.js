'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const { isInteger } = require('lodash')

const validateCreateRequest = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}
  if (req.user && req.user.RoleId === 2 && req.user.employeeId) {
    validatedBody.ClientId = req.user.employeeId
  }
  // qty must be required required  Validating as not empty, valid integer.
  if (!body.qty || !isInteger(body.qty)) {
    errorArray.push({
      field: 'qty',
      error: 'cr-9',
      message: 'Please provide only valid \'qty\' as numeric,.'
    })
  }

  // status must be required required  Validating as not empty, valid integer.

  // ParkingZoneId must be required required  Validating as not empty, valid integer.
  if (!body.ParkingZoneId || isNaN(body.ParkingZoneId)) {
    errorArray.push({
      field: 'ParkingZoneId',
      error: 'cr-11',
      message: 'Please provide only valid \'ParkingZoneId\' as numeric,.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'creativeRequest.middleware.validateCreateRequest')
  }
  validatedBody.qty = body.qty
  validatedBody.status = body.status
  validatedBody.ParkingZoneId = body.ParkingZoneId
  req.validatedBody = validatedBody
  done()
}

const validateGetCreativeRequest = (req, res, done) => {
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
  } else if (query.hasOwnProperty('ClientId') && !isInteger(query.ClientId)) {
    validatedConditions.ClientId = query.ClientId
  }

  // validating as optional number field
  if (query.hasOwnProperty('ParkingZoneId') && query.ParkingZoneId) {
    if (isNaN(query.ParkingZoneId) || query.ParkingZoneId < 0 || query.ParkingZoneId > 99999999999) {
      errorArray.push({
        field: 'ParkingZoneId',
        error: 'MGCR-005',
        message: 'The ParkingZoneId should be number with min 0 and max 99999999999 value.'
      })
    }
    validatedConditions.ParkingZoneId = query.ParkingZoneId
  }

  if (query.limit && query.limit > 0) {
    limit = parseInt(query.limit)
  }

  if (query.offset && query.offset > 0) {
    offset = parseInt(query.offset)
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'creativeRequest.middleware.validateGetCreativeRequest')
  }
  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}

const validateGetCreatives = (req, res, done) => {
  const errorArray = []
  if (isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVGC-8060',
      message: "Please provide only valid 'id' as number."
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'contract.middleware.getContract')
  }
  done()
}

const validateUpdateRequest = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const params = req.params
  const validatedBody = {}
  if (isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVUR-8060',
      message: "Please provide only valid 'id' as number."
    })
  }

  // qty must be required required  Validating as not empty, valid integer.
  if (!body.qty || !isInteger(body.qty)) {
    errorArray.push({
      field: 'qty',
      error: 'cr-9',
      message: 'Please provide only valid \'qty\' as numeric,.'
    })
  }

  // status must be required required  Validating as not empty, valid integer.
  if (!body.status || !isNaN(body.status)) {
    errorArray.push({
      field: 'status',
      error: 'cr-10',
      message: 'Please provide only valid \'status\' as numeric,.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'creativeRequest.middleware.validateCreateRequest')
  }
  validatedBody.qty = body.qty
  validatedBody.status = body.status
  req.validatedBody = validatedBody
  done()
}

module.exports = {
  validateCreateRequest,
  validateGetCreativeRequest,
  validateGetCreatives,
  validateUpdateRequest
}
