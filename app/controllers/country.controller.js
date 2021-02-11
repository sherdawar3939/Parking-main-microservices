'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const StandardError = require('standard-error')
const generalController = require('./general.controller');
const countryHelper = require('../helpers/country.helper');
const serverResponses = require('../config/serverResponses');
const dbseed = require('../config/dbseed');
// const { get } = require('lodash');

// **************************
// Get country
// **********************//
const getCountry = function(req, res) {

    return countryHelper.getCountry(req.conditions)
        .then(function(data) {
            generalController.successResponse(res, 'Country Fetched successfully', data, 'Country.controller.getCountry')
        }).catch(StandardError, function(err) {
            generalController.errorResponse(res, err, 'Country.controller.getCountry', serverResponses)
        }).catch(function(err) {
            generalController.errorResponse(res, err, 'Please check originalError for details', 'country.controller.getCountry', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })
}
module.exports = {
    getCountry
}


//add country
const addCountry = (req, res) => {
    return countryHelper.addCountry(req.validateBody)
        .then(function(data) {
            return generalController.successResponse(res, 'Country added Successfully', 'country.controller.addCountry', data)
        }).catch(StandardError, function(err) {
            return generalController.errorResponse(res, err, 'Country.controller.addCountry', SERVER_RESPONSE.VALIDATION_ERROR)
        }).catch(function(err) {
            return generalController.errorResponse(err, 'Please check up for detail error', 'Country.controller.addCountry', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
        })

}
module.exports = {
    addCountry
}