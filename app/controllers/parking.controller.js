'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { createParkingHelper, ActiveParkingListHelper } = require('../helpers/parking.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')


const createParking = function (req, res) {
    return createParkingHelper(req.validatedBody)
        .then(function (data) {
            generalController.successResponse(res, 'Parking added successfully.', data, 'parking.controller.createParking')
        }).catch(StandardError, function (err) {
            generalController.errorResponse(res, err, null, 'parking.controller.createParking', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch(function (err) {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'parking.controller.createParking', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}
/********Get Active Parking List*********/
const getActiveParkingList = function (req, res) {
    return ActiveParkingListHelper(req.conditions)
        .then(function (data) {
            generalController.successResponse(res, 'Parking fetched successfully.', data, 'parking.controller.getActiveParkingList')
        }).catch(StandardError, function (err) {
            generalController.errorResponse(res, err, null, 'parking.controller.getActiveParkingList', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch(function (err) {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'parking.controller.getActiveParkingList', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}
module.exports = {
    createParking,
    getActiveParkingList
}