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
    return contractHelper.getContractList(req.conditions)
        .then(function (data) {
            generalController.successResponse(res, 'Contract fetch successfully.', data, 'contract.controller.getContractList')
        }).catch(StandardError, function (err) {
            generalController.errorResponse(res, err, null, 'contract.controller.getContractList', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch(function (err) {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'contract.controller.getContractList', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

const verificationOfContract = (req, res) => {
    return contractHelper.verifyContract(req.validatedBody)
        .then((data) => {
            generalController.successResponse(res, 'Contract Updated successfully.', data, 'contract.controller.verificationOfContract')
        }).catch(StandardError, (err) => {
            generalController.errorResponse(res, err, null, 'contract.controller.verificationOfContract', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch((err) => {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'contract.controller.verificationOfContract', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}

module.exports = {
    addContract,
    getContractList,
    verificationOfContract
}