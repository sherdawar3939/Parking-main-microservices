'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const validatePostVoucher = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  if (req.user && req.user.RoleId === 2 && req.user.employeeId) {
    validatedBody.ClientId = req.user.employeeId
  }

  // validating as required number field
  if (!body.fee || isNaN(body.fee)) {
    errorArray.push({
      field: 'fee',
      error: 2345,
      message: 'The fee is required as numeric.'
    })
  }
  // validating as required string field
  if (!body.zip || isNaN(body.zip) || body.zip.length < 5 || body.zip.length > 5) {
    errorArray.push({
      field: 'zip',
      error: 2345,
      message: 'Please provide only valid \'zip\' as numeric, length must be between 0 and 5.'
    })
  }
  // validating as required number field
  if (!body.validityDays || isNaN(body.validityDays)) {
    errorArray.push({
      field: 'validityDays',
      error: 2345,
      message: 'The validityDays is required .'
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parkingZone.middleware.validateUpdateParkingZone')
  }
  if (body.validityDays === 1) {
    req.status = 'daily'
  } else if (body.validityDays === 7) {
    req.status = 'weekly'
  } else if (body.validityDays === 30) {
    req.status = 'monthly'
  } else if (body.validityDays === 90) {
    req.status = '3 month'
  } else if (body.validityDays === 180) {
    req.status = '6 month'
  } else {
    req.status = 'yearly'
  }
  validatedBody.fee = body.fee
  validatedBody.zip = body.zip
  validatedBody.validityDays = body.validityDays
  req.validatedBody = validatedBody
  done()
}
const validateGetVoucher = (req, res, done) => {
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
const validateByIdVoucher = (req, res, done) => {
  const errorArray = []
  // validating as required number field
  if (!req.params.id || isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 1213,
      message: 'The voucherId is required .'
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parkingZone.middleware.getZipCode')
  }
  done()
}
module.exports = {
  validatePostVoucher,
  validateGetVoucher,
  validateByIdVoucher
}
