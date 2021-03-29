'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const ParkingZoneHelper = require('../helpers/parkingZone.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const addParkingZone = function (req, res) {
  return ParkingZoneHelper.addParkingZone(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'ParkingZone added successfully.', data, 'ParkingZone.controller.addParkingZone')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'ParkingZone.controller.addParkingZone', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'ParkingZone.controller.addParkingZone', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const getParkingZone = function (req, res) {
  return ParkingZoneHelper.getparkingZone(req.validatedConditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Parking zone fetched successfully.', data, 'parkingZone.controller.getparkingzone')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'ParkingZone.controller.getParkingZone', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'ParkingZone.controller.getParkingZone', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const getParkingZoneById = (req, res) => {
  return ParkingZoneHelper.getParkingZoneId(req.params.id)
    .then(function (data) {
      generalController.successResponse(res, 'Parking zone fetched successfully.', data, 'parkingZone.controller.getParkingZoneById')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'ParkingZone.controller.getParkingZoneById', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'ParkingZone.controller.getParkingZoneById', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const deleteParkingZone = (req, res) => {
  return ParkingZoneHelper.deleteParkingZone(req.params.id)
    .then(function (data) {
      generalController.successResponse(res, 'Parking zone deleted successfully.', data, 'parkingZone.controller.deleteParkingZone')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'ParkingZone.controller.deleteParkingZone', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'ParkingZone.controller.deleteParkingZone', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const updateParkingZone = (req, res) => {
  return ParkingZoneHelper.updateParkingZone(req.params.id, req.validatedBody)
    .then((data) => {
      generalController.successResponse(res, 'ParkingZone Updated successfully.', data, 'parkingZone.controller.updateParkingZone')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'parkingZone.controller.updateParkingZone', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'parkingZone.controller.updateParkingZone', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  addParkingZone,
  getParkingZone,
  getParkingZoneById,
  deleteParkingZone,
  updateParkingZone
}
