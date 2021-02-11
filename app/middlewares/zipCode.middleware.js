'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash');

const validateGetZipCode = (req, res, done) => {
    const errorArray = [];
    const query = req.query;
    const validateConditions = {}

    if (query.hasOwnProperty('city') && query.city && query.city.length < 20) {
        validateConditions.CityId = query.city;
    }
    if (query.hasOwnProperty('zip') && query.zip && query.zip.length < 20) {
        validateConditions.zipCode = query.zip
    }

    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.getZipCode');
    }

    req.conditions = validateConditions;
    done();
}
module.exports = {
    validateGetZipCode
}