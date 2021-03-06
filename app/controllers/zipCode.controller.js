'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const StandardError = require('standard-error')
const generalController = require('./general.controller')
const zipCodeHelper = require('../helpers/zipCode.helper')

// **************************
// Get ZipCode
// **********************//
const getZipCode = function (req, res) {
  return zipCodeHelper.getZipCode(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'zipCode Fetched successfully', data, 'zipCode.controller.getZipCode')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'zipCode.controller.getZipCode', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'zipCode.controller.getZipCode', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
const getZipCodeByCityId = (req, res) => {
  return zipCodeHelper.getZipCodeByCityIdHelper(req.params.id)
    .then(function (data) {
      generalController.successResponse(res, 'zipCode Fetched successfully by city id', data, 'zipCode.controller.getZipCodeByCityId')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'zipCode.controller.getZipCodeByCityId', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'zipCode.controller.getZipCodeByCityId', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  getZipCode,
  getZipCodeByCityId

}
