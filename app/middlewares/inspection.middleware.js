'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetParkingStatus = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  if (query.hasOwnProperty('startedOn') && query.startedOn) {
    validatedConditions.startedOn = query.startedOn
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parking.middleware.validateGetParkingList')
  }

  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}
module.exports = validateGetParkingStatus
