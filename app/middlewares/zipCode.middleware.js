'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetZipCode = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validateConditions = {}
  if (query.hasOwnProperty('city') && query.city && query.city.length < 20) {
    validateConditions.CityId = query.city
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'city.middleware.getZipCode')
  }

  req.conditions = validateConditions
  done()
}
const validateCityId = (req, res, done) => {
  const errorArray = []
  const params = req.params
  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 80140,
      message: 'Please provide only valid \'CityId\' as numeric.'
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'zipCode.middleware.validateCityId')
  }
  done()
}
module.exports = {
  validateGetZipCode,
  validateCityId
}
