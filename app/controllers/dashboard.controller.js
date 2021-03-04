'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { getDashboardDetails, getDashboardClientCounts } = require('../helpers/dashboard.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const adminDashboardDetail = function (req, res) {
  return getDashboardDetails(req.validatedConditions)
    .then(function (data) {
      generalController.successResponse(res, 'Dashboard Details fetched successfully.', data, 'dashboard.controller.adminDashboardDetail')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'dashboard.controller.adminDashboardDetail', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'dashboard.controller.adminDashboardDetail', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
const clientDashboardDetails = function (req, res) {
  return getDashboardClientCounts(req.params.ClientId)
    .then(function (data) {
      generalController.successResponse(res, 'Client Dashboard Details fetched successfully.', data, 'dashboard.controller.clientDashboardDetails')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'dashboard.controller.clientDashboardDetails', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'dashboard.controller.clientDashboardDetails', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  adminDashboardDetail,
  clientDashboardDetails
}
