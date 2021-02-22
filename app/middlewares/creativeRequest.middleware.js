'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const { isString, isInteger } = require('lodash')
const validateCreateRequest = (req, res, done) => {
    const errorArray = []
    const body = req.body
    const validatedBody = {}
        // amount must be required required  Validating as not empty, valid integer.
    if (!body.uid || !isNaN(body.uid)) {
        errorArray.push({
            field: 'uid',
            error: 26,
            message: 'Please provide only valid \'uid\' as string.'
        })
    }
    // qty must be required required  Validating as not empty, valid integer.
    if (!body.qty || !isInteger(body.qty)) {
        errorArray.push({
            field: 'qty',
            error: 26,
            message: 'Please provide only valid \'qty\' as numeric,.'
        })
    }
    if (!body.status) {
        errorArray.push({
            field: 'status',
            error: 26,
            message: 'Please provide only valid \'status\' as string,.'
        })
    }
    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'creativeRequest.middleware.validateCreateRequest')
    }
    validatedBody.uid = body.uid;
    validatedBody.qty = body.qty;
    validatedBody.status = body.status;
    req.validatedBody = validatedBody;
    done()
}

const validateGetCreativeRequest = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedConditions = {}

    if (query.hasOwnProperty('status') && query.status) {
        validatedConditions.status = query.status
    }
    if (query.hasOwnProperty('ClientId') && !isNaN(query.ClientId)) {
        validatedConditions.ClientId = query.ClientId
    }
    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'creativeRequest.middleware.validateGetCreativeRequest')
    }
    req.conditions = validatedConditions;
    done()
}

module.exports = {
    validateCreateRequest,
    validateGetCreativeRequest
}