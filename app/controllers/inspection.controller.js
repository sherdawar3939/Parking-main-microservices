'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { ParkingStatusInspection } = require('../helpers/inspection.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')
/* Get Active Parking Status */
const getActiveParkingStatus = function (req, res) {
  return ParkingStatusInspection(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'ParkingStatus fetched successfully.', data, 'inspection.controller.getActiveParkingStatus')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'inspection.controller.getActiveParkingStatus', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'inspection.controller.getActiveParkingStatus', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = getActiveParkingStatus
