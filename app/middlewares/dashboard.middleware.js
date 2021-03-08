'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetClientsRevenue = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const params = req.params
  const validatedConditions = {}
  let field = ''

  if (query.hasOwnProperty('ClientId') && query.ClientId) {
    if (isNaN(query.ClientId)) {
      errorArray.push({
        field: 'ClientId',
        error: 25,
        message: 'Please provide only valid \'ClientId\' as numeric.'
      })
    }
    validatedConditions.ClientId = query.ClientId
  }

  if (query.hasOwnProperty('UserId') && query.UserId) {
    if (isNaN(query.UserId)) {
      errorArray.push({
        field: 'UserId',
        error: 25,
        message: 'Please provide only valid \'UserId\' as numeric.'
      })
    }
    validatedConditions.UserId = query.UserId
  }

  if (!params.userType || (params.userType !== 'client' && params.userType !== 'admin')) {
    errorArray.push({
      field: 'userType',
      error: 'DGCR-5',
      message: 'Please provide user type as client or admin.'
    })
  }

  if (query.hasOwnProperty('startDate') && query.startDate) {
    validatedConditions.startDate = query.startDate
  }
  if (query.hasOwnProperty('endDate') && query.endDate) {
    validatedConditions.endDate = query.endDate
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'dashboard.middleware.validateGetClientsRevenue')
  }

  if (params.type === 'revenue' && params.userType === 'admin') {
    field = '(adminTax + adminProfit)'
  } else if (params.type === 'profit' && params.userType === 'admin') {
    field = 'adminProfit'
  } else if (params.type === 'tax' && params.userType === 'admin') {
    field = 'adminTax'
  }

  if (params.type === 'revenue' && params.userType === 'client') {
    field = '(clientTax + clientProfit)'
  } else if (params.type === 'profit' && params.userType === 'client') {
    field = 'clientProfit'
  } else if (params.type === 'tax' && params.userType === 'client') {
    field = 'clientTax'
  }
  req.field = field
  req.conditions = validatedConditions

  done()
}

const validateGetParkingCounts = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  if (query.hasOwnProperty('startDate') && query.startDate) {
    validatedConditions.startDate = query.startDate
  }
  if (query.hasOwnProperty('endDate') && query.endDate) {
    validatedConditions.endDate = query.endDate
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'dashboard.middleware.validateGetClientsRevenue')
  }

  req.conditions = validatedConditions

  done()
}

const validateGetReportListing = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  if (query.hasOwnProperty('ClientId') && query.ClientId) {
    if (isNaN(query.ClientId)) {
      errorArray.push({
        field: 'ClientId',
        error: 25,
        message: 'Please provide only valid \'ClientId\' as numeric.'
      })
    }
    validatedConditions.ClientId = query.ClientId
  }

  if (query.hasOwnProperty('startDate') && query.startDate) {
    validatedConditions.startDate = query.startDate
  }
  if (query.hasOwnProperty('endDate') && query.endDate) {
    validatedConditions.endDate = query.endDate
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'dashboard.middleware.validateGetClientsRevenue')
  }

  req.conditions = validatedConditions

  done()
}
module.exports = { validateGetClientsRevenue, validateGetParkingCounts, validateGetReportListing }
