'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const { isString } = require('lodash')

const validateCreateRequest = (req, res, done) => {
    const errorArray = []
    const body = req.body
    const validatedBody = {}

    // qty must be required required  Validating as not empty, valid integer.
    if (!body.qty || isNaN(body.qty)) {
        errorArray.push({
            field: 'qty',
            error: 'cr-5',
            message: 'Please provide only valid \'qty\' as numeric,.'
        })
    }

    // ParkingZoneId must be required required  Validating as not empty, valid integer.
    if (!body.ParkingZoneId || isNaN(body.ParkingZoneId)) {
        errorArray.push({
            field: 'ParkingZoneId',
            error: 'cr-10',
            message: 'Please provide only valid \'ParkingZoneId\' as numeric,.'
        })
    }

    // ClientId must be required required  Validating as not empty, valid integer.
    if (!body.ClientId || isNaN(body.ClientId)) {
        errorArray.push({
            field: 'ClientId',
            error: 'cr-10',
            message: 'Please provide only valid \'ClientId\' as numeric,.'
        })
    }

    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'creativeRequest.middleware.validateCreateRequest')
    }

    validatedBody.ParkingZoneId = body.ParkingZoneId
    validatedBody.ClientId = body.ClientId
    validatedBody.qty = body.qty
    validatedBody.status = 'Pending'
    req.validatedBody = validatedBody
    done()
}

const validateGetCreativeRequest = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedConditions = {}

    let limit = 50;
    let offset = 0;

    if (query.hasOwnProperty('search') && query.search) {
        validatedConditions.search = query.search
    }

    if (query.hasOwnProperty('status') && query.status) {
        validatedConditions.status = query.status
    }

    if (query.hasOwnProperty('Clientid') && !isNaN(query.Clientid)) {
        validatedConditions.ClientId = query.Clientid
    }

    if (query.hasOwnProperty('ParkingZoneId') && !isNaN(query.ParkingZoneId)) {
        validatedConditions.ParkingZoneId = query.ParkingZoneId
    }

    if (query.limit && query.limit > 0) {
        limit = parseInt(query.limit)
    }

    if (query.offset && query.offset > 0) {
        offset = parseInt(query.offset)
    }

    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'creativeRequest.middleware.validateGetCreativeRequest')
    }

    req.conditions = validatedConditions;
    req.limit = limit;
    req.offset = offset;
    done()
}

module.exports = {
    validateCreateRequest,
    validateGetCreativeRequest
}
