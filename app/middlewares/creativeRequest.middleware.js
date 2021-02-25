'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const { isInteger } = require('lodash')
const validateCreateRequest = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}
  // amount must be required required  Validating as not empty, valid integer.
  if (!body.uid || !isNaN(body.uid)) {
    errorArray.push({
      field: 'uid',
      error: 26,
      message: 'Please provide only valid \'uid\' as string.'
    })
  }
  // qty must be required required  Validating as not empty, valid integer.
  if (!body.qty || !isInteger(body.qty)) {
    errorArray.push({
      field: 'qty',
      error: 'cr-5',
      message: 'Please provide only valid \'qty\' as numeric,.'
    })
  }

  // ParkingZoneId must be required required  Validating as not empty, valid integer.
  if (!body.status || !isNaN(body.status)) {
    errorArray.push({
      field: 'status',
      error: 'cr-10',
      message: 'Please provide only valid \'status\' as numeric,.'
    })
  }

  // ClientId must be required required  Validating as not empty, valid integer.
  if (!body.ClientId || isNaN(body.ClientId)) {
    errorArray.push({
      field: 'ClientId',
      error: 'cr-10',
      message: 'Please provide only valid \'ClientId\' as numeric,.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'creativeRequest.middleware.validateCreateRequest')
  }
  validatedBody.uid = body.uid
  validatedBody.qty = body.qty
  validatedBody.status = body.status
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
  if (query.hasOwnProperty('ClientId') && !isInteger(query.ClientId)) {
    validatedConditions.ClientId = query.ClientId
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

module.exports = {
  validateCreateRequest,
  validateGetCreativeRequest
}
