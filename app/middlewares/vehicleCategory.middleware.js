'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetVehicleCategory = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  // validating as optional string field
  if (query.hasOwnProperty('name') && query.name && query.name.length < 20) {
    validatedConditions.name = query.name
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validateGetVehicleCategory')
  }

  req.conditions = validatedConditions
  done()
}

module.exports = {
  validateGetVehicleCategory
}
