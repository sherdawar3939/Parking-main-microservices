'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const voucherHelper = require('../helpers/voucher.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Get Vehicle Category
const createVoucher = function (req, res) {
  return voucherHelper.createVoucherHelper(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Voucher created successfully.', data, 'Voucher.controller.createVoucher')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Voucher.controller.createVoucher', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'createVoucher.controller.createVoucher', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
const getVoucher = (req, res) => {
  return voucherHelper.getVoucherHelper(req.validatedConditions)
    .then(function (data) {
      generalController.successResponse(res, 'Voucher get successfully.', data, 'Voucher.controller.getVoucher')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Voucher.controller.getVoucher', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'createVoucher.controller.getVoucher', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
const getVoucherById = (req, res) => {
  return voucherHelper.getVoucherByIdHelper(req.params.id)
    .then(function (data) {
      generalController.successResponse(res, 'Voucher get successfully.', data, 'Voucher.controller.getVoucherById')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Voucher.controller.getVoucherById', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'createVoucher.controller.getVoucherById', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  createVoucher,
  getVoucher,
  getVoucherById
}
