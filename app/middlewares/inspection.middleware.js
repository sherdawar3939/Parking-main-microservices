'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetParkingStatus = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  if (query.hasOwnProperty('startedOn') && query.startedOn) {
    validatedConditions.startedOn = query.startedOn
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parking.middleware.validateGetParkingList')
  }

  req.conditions = validatedConditions

  done()
}
module.exports = validateGetParkingStatus
