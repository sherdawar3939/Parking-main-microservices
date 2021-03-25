'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { createUserVoucher, updateUserVoucher, deleteUserVoucherID, getUserVoucherID, getUserVoucherList } = require('../helpers/UserVoucher.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

/** Add user Voucher */
const addUserVoucher = (req, res) => {
  return createUserVoucher(req.validatedUserData)
    .then(function (data) {
      generalController.successResponse(res, 'User Voucher add successfully.', data, 'userVoucher.controller.addUserVoucher')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'userVoucher.controller.addUserVoucher', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'userVoucher.controller.addUserVoucher', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/* Get UserVouchers List **/
const getUserVouchersList = function (req, res) {
  return getUserVoucherList(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'User Vouchers fetched successfully.', data, 'userVoucher.controller.getUserVouchersList')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'userVoucher.controller.getUserVouchersList', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'userVoucher.controller.getUserVouchersList', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** update User Vouchers By ID */
const updateUserVoucherById = (req, res) => {
  return updateUserVoucher(req.params.id, req.body)
    .then((data) => {
      generalController.successResponse(res, 'User Vouchers Updated successfully.', data, 'userVoucher.controller.updateUserVoucherById')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'userVoucher.controller.updateUserVoucherById', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'userVoucher.controller.updateUserVoucherById', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Delete User Vouchers By ID */
const deleteUserVoucher = function (req, res) {
  return deleteUserVoucherID(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'UserVoucher deleted successfully.', data, 'userVoucher.controller.deleteUserVoucherUser')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'userVoucher.controller.deleteUserVoucherUser', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'userVoucher.controller.deleteUserVoucherUser', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Get User Vouchers By ID */
const getUserVoucher = function (req, res) {
  return getUserVoucherID(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'UserVoucher Fetched successfully.', data, 'userVoucher.controller.getUserVoucherUser')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'userVoucher.controller.getUserVoucherUser', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'userVoucher.controller.getUserVoucherUser', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = { addUserVoucher, updateUserVoucherById, deleteUserVoucher, getUserVoucher, getUserVouchersList }
