'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetContractList = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validateConditions = {}

    if (query.hasOwnProperty('id') && !isNaN(query.id)) {
        validateConditions.id = query.id;
    }

    if (query.hasOwnProperty('clientId') && !isNaN(query.clientId)) {
        validateConditions.ClientId = query.clientId
    }

    if (query.hasOwnProperty('status') && query.status && query.status.length < 20) {
        validateConditions.status = query.status
    }

    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'contract.middleware.getContractList')
    }

    if (query.limit && query.limit > 0) {
        limit = parseInt(query.limit)
    }

    if (query.offset && query.offset > 0) {
        offset = parseInt(query.offset)
    }

    req.conditions = validateConditions
    req.limit = query.limit && query.limit > 0 ? parseInt(query.limit) : 50
    req.offset = query.offset && query.offset > 0 ? parseInt(query.offset) : 0
    done()
}

// const validateVerifyContract = (req, res, done) => {
//     const errorArray = []
//     const body = req.body
//     const validatedBody = {}

//     console.log(req.body.id)
//     if (!body.id || isNaN(body.id)) {
//         errorArray.push({
//             field: 'id',
//             error: 80140,
//             message: 'Please provide only valid \'id\' as numeric.'
//         })
//         validatedBody.id = body.id
//     }

//     req.validatedBody.id = validatedBody

//     done()
// }

const validateVerifyContract = (req, res, done) => {
    const errorArray = []
    const params = req.body
    const validatedBody = {};
    if (!params.id || isNaN(params.id)) {
        errorArray.push({
            field: 'id',
            error: 80140,
            message: 'Please provide only valid \'id\' as numeric.'
        })
    }

    if (params.hasOwnProperty('id') && !isNaN(params.id)) {
        validatedBody.id = params.id;
    }
    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'contract.middleware.validateVerifyContract')
    }
    req.validatedBody = validatedBody
    done()
}

module.exports = {
    validateGetContractList,
    validateVerifyContract
}
