'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const validatePostPayment = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // amount must be required required  Validating as not empty, valid integer.
  if (!body.amount || isNaN(body.amount)) {
    errorArray.push({
      field: 'amount',
      error: 26,
      message: 'Please provide only valid \'amount\' as numeric.'
    })
  }
  // ClientId must be required required  Validating as not empty, valid integer.
  if (!body.ClientId || isNaN(body.ClientId)) {
    errorArray.push({
      field: 'ClientId',
      error: 26,
      message: 'Please provide only valid \'ClientId\' as numeric,.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'payment.middleware.validatePostPayment')
  }
  validatedBody.amount = body.amount
  validatedBody.ClientId = body.ClientId
  req.validatedBody = validatedBody
  done()
}

const validateGetPayment = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  let limit = 50
  let offset = 0

  if (query.hasOwnProperty('ClientId') && query.ClientId) {
    if (isNaN(query.UserId)) {
      errorArray.push({
        field: 'ClientId',
        error: 25,
        message: 'Please provide only valid \'ClientId\' as numeric.'
      })
    }
    validatedConditions.ClientId = query.ClientId
  }

  if (query.limit && query.limit > 0) {
    limit = parseInt(query.limit)
  }

  if (query.offset && query.offset > 0) {
    offset = parseInt(query.offset)
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'payment.middleware.validateGetPayment')
  }

  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}

module.exports = {
  validatePostPayment,
  validateGetPayment
}
