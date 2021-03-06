'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetClientsRevenue = (req, res, done) => {
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

module.exports = { validateGetClientsRevenue }
