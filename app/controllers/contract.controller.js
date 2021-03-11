'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const StandardError = require('standard-error')
const generalController = require('./general.controller')
const contractHelper = require('../helpers/contract.helper')
// const _ = require('lodash')

// **************************
//         Contract
// **********************//
const addContract = function (req, res) {
  return contractHelper.addContract(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Contract added successfully.', data, 'contract.controller.addContract')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'contract.controller.addContract', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'contract.controller.addContract', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Get Contract list
// ***********************************

const getContractList = function (req, res) {
  return contractHelper.getContractList(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Contract fetch successfully.', data, 'contract.controller.getContractList')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'contract.controller.getContractList', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'contract.controller.getContractList', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const getContract = function (req, res) {
  return contractHelper.getContract(req.params.id)
    .then(function (data) {
      generalController.successResponse(res, 'Contract fetch successfully.', data, 'contract.controller.getContract')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'contract.controller.getContract', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'contract.controller.getContract', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const verificationOfContract = (req, res) => {
  return contractHelper.verifyContract(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'Contract Updated successfully.', data, 'contract.controller.verificationOfContract')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'contract.controller.verificationOfContract', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'contract.controller.verificationOfContract', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
const getApprovedContract = (req, res) => {
  return contractHelper.getApprovedContract(req.validatedConditions.ClientId)
    .then((data) => {
      generalController.successResponse(res, 'Get Contract  successfully.', data, 'contract.controller.getApprovedContract')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'contract.controller.getApprovedContract', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'contract.controller.getApprovedContract', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
const uploadFiles = (req, res) => {
  return contractHelper.uploadFilesHelper(req.file, req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'upload Contract  successfully.', data, 'contract.controller.uploadFiles')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'contract.controller.uploadFiles', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'contract.controller.uploadFiles', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  addContract,
  getContractList,
  verificationOfContract,
  getApprovedContract,
  getContract,
  uploadFiles
}
