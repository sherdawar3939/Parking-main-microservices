'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { createInspector, updateInspector, deleteInspector, getInspector } = require('../helpers/inspector.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const addinspector = (req, res) => {
  return createInspector(req.validatedUserData, req.validatedInspectorData)
    .then(function (data) {
      generalController.successResponse(res, 'Inspector add successfully.', data, 'inpector.controller.addinspector')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Inspector.controller.addinspector', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Inspector.controller.addinspector', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const updateInspectorById = (req, res) => {
  return updateInspector(req.params.id, req.body)
    .then((data) => {
      generalController.successResponse(res, 'updateInspector Updated successfully.', data, 'updateInspector.controller.updateInspectorById')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'updateInspector.controller.updateInspectorById', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'updateInspector.controller.updateInspectorById', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const deleteInspectorUser = function (req, res) {
  return deleteInspector(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'Inspector deleted successfully.', data, 'inspector.controller.deleteInspectorUser')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'inspector.controller.deleteInspectorUser', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'inspector.controller.deleteInspectorUser', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const getInspectorUser = function (req, res) {
  return getInspector(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'Inspector deleted successfully.', data, 'inspector.controller.getInspectorUser')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'inspector.controller.getInspectorUser', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'inspector.controller.getInspectorUser', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = { addinspector, updateInspectorById, deleteInspectorUser, getInspectorUser }
