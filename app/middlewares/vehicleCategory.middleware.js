'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetVehicleCategory = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validatedConditions = {}

    // validating as optional string field
    if (query.hasOwnProperty('name') && query.name && query.name.length < 20) {
        validatedConditions.name = query.name
    }

    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'vehicleCategory.middleware.validateGetVehicleCategory')
    }

    req.conditions = validatedConditions
    done()
}
const validateDeleteVehicleCategoryId = (req, res, done) => {
    const errorArray = []
    const params = req.params
    if (!params.id || isNaN(params.id)) {
        errorArray.push({
            field: 'id',
            error: 80140,
            message: 'Please provide only valid \'VehicleCategoryId\' as numeric.'
        })
    }
    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'vehicleCategory.middleware.validateDeleteVehicleCategoryId')
    }
    done()
}

const createVehicleCategory = (req, res, done) => {
    const errorArray = []
    const body = req.body
    const validatedBody = {}
    if (!body.name || !isNaN(body.name)) {
        errorArray.push({
            field: 'name',
            error: 26,
            message: 'Please provide only valid \'name\' as string.'
        })
    }

    if (!_.isEmpty(errorArray)) {
        return generalMiddleware.standardErrorResponse(res, errorArray, 'vehicleCategory.middleware.createVehicleCategory')
    }
    validatedBody.name = body.name
    req.validatedBody = validatedBody
    done()
}

module.exports = {
    validateGetVehicleCategory,
    validateDeleteVehicleCategoryId,
    createVehicleCategory
}