'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const paymentHelper = require('../helpers/payment.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const addPayment = function (req, res) {
  return paymentHelper.addpayment(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Payment added successfully.', data, 'payment.controller.addPayment')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Payment.controller.addPayment', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Payment.controller.addPayment', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
const getPayment = function (req, res) {
  return paymentHelper.getpayment(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, ' Get Payment  successfully.', data, 'payment.controller.getPayment')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Payment.controller.getPayment', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Payment.controller.getPayment', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  addPayment,
  getPayment
}
