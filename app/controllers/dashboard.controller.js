'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { getDashboardDetails,
  getDashboardClientCounts,
  getClientRevenueDetails,
  getParkingCounts,
  getReportListing,
  parkingZoneOverview,
  seasonalVoucherSold,
  validSeasonalPass
} = require('../helpers/dashboard.helper')
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

const clientDashboardDetails = function (req, res, next) {
  return getDashboardClientCounts(req.params.ClientId, next)
    .then(function (data) {
      generalController.successResponse(res, 'Client Dashboard Details fetched successfully.', data, 'dashboard.controller.clientDashboardDetails')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'dashboard.controller.clientDashboardDetails', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'dashboard.controller.clientDashboardDetails', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const clientRevenueDetails = function (req, res) {
  return getClientRevenueDetails(req.conditions, req.field)
    .then(function (data) {
      generalController.successResponse(res, 'Graph Revenue Details fetched successfully.', data, 'dashboard.controller.clientRevenueDetails')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'dashboard.controller.clientRevenueDetails', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'dashboard.controller.clientRevenueDetails', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const dashboardParkingCounts = function (req, res) {
  return getParkingCounts(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'parking-counts fetched successfully.', data, 'dashboard.controller.dashboardParkingCounts')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'dashboard.controller.dashboardParkingCounts', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'dashboard.controller.dashboardParkingCounts', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const profitReportListing = function (req, res) {
  return getReportListing(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Profit-Report Details fetched successfully.', data, 'dashboard.controller.ProfitReportListing')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'dashboard.controller.ProfitReportListing', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'dashboard.controller.ProfitReportListing', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** ********************* */
/** parking Zone Reporting */
/** ********************* */

const parkingZoneReport = function (req, res) {
  return parkingZoneOverview(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Parking Zone Report Details fetched successfully.', data, 'dashboard.controller.parkingZoneReport')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'dashboard.controller.parkingZoneReport', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'dashboard.controller.parkingZoneReport', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** parking Zone Reporting */

const seasonalTicketSold = function (req, res) {
  return seasonalVoucherSold(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Seasonal Voucher Sold Details fetched successfully.', data, 'dashboard.controller.seasonalTicketSold')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'dashboard.controller.seasonalTicketSold', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'dashboard.controller.seasonalTicketSold', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** parking Zone Reporting */

const validSeasonalTicket = function (req, res) {
  return validSeasonalPass(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Valid Seasonal Tickets fetched successfully.', data, 'dashboard.controller.validSeasonalTicket')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'dashboard.controller.validSeasonalTicket', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'dashboard.controller.validSeasonalTicket', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  adminDashboardDetail,
  clientDashboardDetails,
  clientRevenueDetails,
  dashboardParkingCounts,
  profitReportListing,
  parkingZoneReport,
  seasonalTicketSold,
  validSeasonalTicket
}
