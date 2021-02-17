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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'userVehicle.middleware.validatePostUserVehicle')
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
  done()
}
module.exports = {
  validatePostPayment,
  validateGetPayment
}
