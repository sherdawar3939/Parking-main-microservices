'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { createRequest, getRequestList, getCreatives, updateCreativeRequest } = require('../helpers/creativeRequest.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const createCreativeRequest = function (req, res) {
  return createRequest(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'CreativeRequest added successfully.', data, 'creativeRequest.controller.createCreativeRequest')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'creativeRequest.controller.createCreativeRequest', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'creativeRequest.controller.createCreativeRequest', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
/* Get Creative Request List **/
const getCreativeRequestList = function (req, res) {
  return getRequestList(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'CreateiveRequest fetched successfully.', data, 'creativeRequest.controller.getCreativeRequestList')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'creativeRequest.controller.getCreativeRequestList', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'creativeRequest.controller.getCreativeRequestList', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const getCreative = function (req, res) {
  return getCreatives(req.params.id)
    .then(function (data) {
      generalController.successResponse(res, 'CreateiveRequest fetched successfully.', data, 'creativeRequest.controller.getCreatives')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'creativeRequest.controller.getCreatives', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'creativeRequest.controller.getCreatives', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const updateCreativeRequests = function (req, res) {
  return updateCreativeRequest(req.params.id, req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'CreateiveRequest updated successfully.', data, 'creativeRequest.controller.updateCreativeRequests')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'creativeRequest.controller.updateCreativeRequests', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'creativeRequest.controller.updateCreativeRequests', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  createCreativeRequest,
  getCreativeRequestList,
  getCreative,
  updateCreativeRequests }
