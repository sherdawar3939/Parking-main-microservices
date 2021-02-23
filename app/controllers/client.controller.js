'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const ParkingZoneHelper = require('../helpers/client.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const getClient = function (req, res) {
  return ParkingZoneHelper.getClientList(req.validatedConditions)
    .then(function (data) {
      generalController.successResponse(res, 'Client fetched successfully.', data, 'Banner.controller.getClient')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Client.controller.getClient', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Client.controller.getClient', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
const getClientById = (req, res) => {
  return ParkingZoneHelper.getClientDetail(req.params.id)
    .then(function (data) {
      generalController.successResponse(res, 'Client fetched successfully.', data, 'Banner.controller.getClientById')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Client.controller.getClientById', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Client.controller.getClientById', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  getClient,
  getClientById
}
