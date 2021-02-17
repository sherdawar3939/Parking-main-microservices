'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const ParkingZoneHelper = require('../helpers/paringZone.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const getParkingZone = function (req, res) {
  return ParkingZoneHelper.getparkingZone(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Parking zone fetched successfully.', data, 'Banner.controller.getparkingzone')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'ParkingZone.controller.getParkingZone', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'ParkingZone.controller.getParkingZone', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  getParkingZone
}