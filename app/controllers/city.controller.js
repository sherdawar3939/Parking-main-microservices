'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const StandardError = require('standard-error')
const generalController = require('./general.controller')
const cityHelper = require('../helpers/city.helper')
// **************************
// Get country
// **********************//
const getCity = function (req, res) {
  return cityHelper.getCity(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'City Fetched successfully', data, 'city.controller.getCity')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'city.controller.getCity', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'city.controller.getCity', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  getCity
}
