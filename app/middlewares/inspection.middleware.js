'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetParkingStatus = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  if (query.hasOwnProperty('licensePlate') && query.licensePlate) {
    validatedConditions.licensePlate = query.licensePlate
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'inspection.middleware.validateGetParkingStatus')
  }

  req.conditions = validatedConditions

  done()
}
module.exports = validateGetParkingStatus
