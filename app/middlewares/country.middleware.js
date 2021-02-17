'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetCountry = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validateConditions = {}

  if (query.hasOwnProperty('name') && query.name && query.name.length < 20) {
    validateConditions.name = query.name
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'country.middleware.getCountry')
  }

  req.conditions = validateConditions
  done()
}

module.exports = {
  validateGetCountry
}
