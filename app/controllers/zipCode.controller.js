'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const StandardError = require('standard-error')
const generalController = require('./general.controller');
const serverResponses = require('../config/serverResponses');
const zipCodeHelper = require('../helpers/zipCode.helper')
const _ = require('lodash')

// **************************
// Get ZipCode
// **********************//
const getZipCode = function(req, res) {

    return zipCodeHelper.getZipCode(req.conditions)
        .then(function(data) {
            generalController.successResponse(res, 'zipCode Fetched successfully', data, 'ZipCode.controller.getZipCode')
        }).catch(StandardError, function(err) {
            generalController.errorResponse(res, err, 'ZipCode.controller.getZipCode', serverResponses)
        }).catch(function(err) {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'country.controller.getZipCode', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}
module.exports = {
    getZipCode
}