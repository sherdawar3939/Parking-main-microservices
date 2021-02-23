'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const StandardError = require('standard-error')
const generalController = require('./general.controller')
const countryHelper = require('../helpers/country.helper')

// **************************
// Get country
// **********************//
const getCountry = function (req, res) {
  return countryHelper.getCountry(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Country Fetched successfully', data, 'country.controller.getCountry')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'Country.controller.getCountry', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'country.controller.getCountry', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  getCountry
}
