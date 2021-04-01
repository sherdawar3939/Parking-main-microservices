'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetVehicleCategory = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  let limit = 50
  let offset = 0

  // validating as optional string field
  if (query.hasOwnProperty('name') && query.name && query.name.length < 20) {
    validatedConditions.name = query.name
  }

  if (query.limit && query.limit > 0) {
    limit = parseInt(query.limit)
  }

  if (query.offset && query.offset > 0) {
    offset = parseInt(query.offset)
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'vehicleCategory.middleware.validateGetVehicleCategory')
  }
  validatedConditions.isDeleted = false
  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset

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
