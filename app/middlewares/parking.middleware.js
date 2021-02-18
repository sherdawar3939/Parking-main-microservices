'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const validateCreateParking = (req, res, done) => {
    const errorArray = []
    const body = req.body
    const validatedBody = {}
    if (!body.status || isNaN(body.status)) {
        errorArray.push({
            field: 'status',
            error: 26,
            message: 'Please provide only valid \'status\' as string.'
        })
    }
    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'parking.middleware.validateCreateParking')
    }
    validatedBody.status = body.status
    req.validatedBody = validatedBody
    done()
}

const validateGetParkingList = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedConditions = {}

    if (query.hasOwnProperty('status') && query.status) {
        validatedConditions.status = query.status
    }
    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'parking.middleware.validateGetParkingList')
    }

    req.conditions = validatedConditions;
    done()
}

module.exports = {
    validateCreateParking,
    validateGetParkingList
}
