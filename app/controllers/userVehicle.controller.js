'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const UserVehicleHelper = require('../helpers/UserVehicle.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const getUserVehicle = function (req, res) {
  return UserVehicleHelper.getUserVehicle(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'User Vehicle fetched successfully.', data, 'userVehicle.controller.getUserVehicle')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'UserVehicle.controller.getUserVehicle', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'UserVehicle.controller.getUserVehicle', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const addUserVehicle = function (req, res) {
  return UserVehicleHelper.addUserVehicle(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'User Vehicle added successfully.', data, 'userVehicle.controller.adduservehicle')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'userVehicle.controller.addUserVehicle', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'userVehicle.controller.adduserVehicle', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
const updateUserVehicle = (req, res) => {
  return UserVehicleHelper.updateUserVehicle(req.params.id, req.body)
    .then((data) => {
      generalController.successResponse(res, 'User Vehicle Updated successfully.', data, 'userVehicle.controller.updateUserVehicle')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'userVehicle.controller.updateUserVehicle', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'userVehicle.controller.updateUserVehicle', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const deleteUserVehicle = function (req, res) {
  return UserVehicleHelper.deleteUserVehicle(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'User Vehicle deleted successfully.', data, 'userVehicle.controller.deleteUserVehicle')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'userVehicle.controller.deleteUserVehicle', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'userVehicle.controller.deleteUserVehicle', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  getUserVehicle,
  addUserVehicle,
  updateUserVehicle,
  deleteUserVehicle
}
