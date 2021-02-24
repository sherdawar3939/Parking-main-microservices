'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const ClientHelper = require('../helpers/client.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const getClient = function (req, res) {
  return ClientHelper.getClientList(req.validatedConditions)
    .then(function (data) {
      generalController.successResponse(res, 'Client fetched successfully.', data, 'Banner.controller.getClient')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Client.controller.getClient', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Client.controller.getClient', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
const getClientById = (req, res) => {
  return ClientHelper.getClientDetail(req.params.id)
    .then(function (data) {
      generalController.successResponse(res, 'Client fetched successfully.', data, 'Banner.controller.getClientById')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Client.controller.getClientById', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Client.controller.getClientById', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const addClient = (req, res) => {
  return ClientHelper.postClient(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Client add successfully.', data, 'Banner.controller.addClient')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Client.controller.addClient', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Client.controller.addClient', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  getClient,
  getClientById,
  addClient
}
