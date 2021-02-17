'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const vehicleCategoryHelper = require('../helpers/vehicleCategory.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Get Vehicle Category
const getVehicleCategory = function (req, res) {
  return vehicleCategoryHelper.getVehicleCategory(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Vehicle fetched successfully.', data, 'Banner.controller.getVehicleCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'vehicleCategory.controller.getVehicleCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'vehicleCategory.controller.getVehicleCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

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
  createVehicleCategory
}
