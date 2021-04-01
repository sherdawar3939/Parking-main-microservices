'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { getInspectionHelper, createInspectionHelper } = require('../helpers/inspection.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Fetch Inspection
const getInspection = function (req, res) {
  return getInspectionHelper(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Inspection fetched successfully.', data, 'inspection.controller.getInspectionHelper')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'inspection.controller.getInspection', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'inspection.controller.getInspectionHelper', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
const createInspection = function (req, res) {
  return createInspectionHelper(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Inspection created successfully.', data, 'inspection.controller.createInspectionHelper')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'inspection.controller.createInspectionHelper', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'inspection.controller.createInspectionHelper', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = { getInspection, createInspection }
