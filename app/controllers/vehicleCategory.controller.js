'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const vehicleCategoryHelper = require('../helpers/vehicleCategory.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Get Vehicle Category
const getVehicleCategory = function (req, res) {
  return vehicleCategoryHelper.getVehicleCategory(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Vehicle fetched successfully.', data, 'vehicleCategory.controller.getVehicleCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'vehicleCategory.controller.getVehicleCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'vehicleCategory.controller.getVehicleCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Delete Vehicle Category
const deleteVehicleCategory = function (req, res) {
  return vehicleCategoryHelper.deleteVehicleCategory(req.params.id)
    .then(function (data) {
      generalController.successResponse(res, 'VehicleCategory deleted successfully.', data, 'vehicleCategory.controller.deleteVehicleCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'vehicleCategory.controller.deleteVehicleCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'vehicleCategory.controller.deleteVehicleCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Create Vehicle Category
const createVehicleCategory = function (req, res) {
  return vehicleCategoryHelper.createCategoryVehicle(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'VehicleCategory added successfully.', data, 'vehicleCategory.controller.createVehicleCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'vehicleCategory.controller.createVehicleCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'vehicleCategory.controller.createVehicleCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  getVehicleCategory,
  createVehicleCategory,
  deleteVehicleCategory
}
