'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const { isInteger } = require('lodash')

const validateGetUserVehicle = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  if (query.hasOwnProperty('UserId') && query.UserId) {
    if (isNaN(query.UserId)) {
      errorArray.push({
        field: 'UserId',
        error: 'MVGV-8080',
        message: 'Please provide only valid \'UserId\' as integer.'
      })
    }
    validatedConditions.UserId = query.UserId
  }

  // validating as optional number field
  if (query.hasOwnProperty('id') && query.id) {
    if (isNaN(query.id) || query.id < 1 || query.id > 999999999) {
      errorArray.push({
        field: 'id',
        error: 'VGUV-005',
        message: 'The id should be number with min 1 and max 999999999 value.'
      })
    }
    validatedConditions.id = query.id
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'userVehicle.middleware.validateGetUserVehicle')
  }

  req.conditions = validatedConditions
  done()
}
const validatePostUserVehicle = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // licensePlate must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.licensePlate) || body.licensePlate.length < 2 || body.licensePlate.length > 20) {
    errorArray.push({
      field: 'licensePlate',
      error: 'MVPUV-8080',
      message: 'Please provide only valid \'licensePlate\' as string, length must be between 2 and 20.'
    })
  }
  // quantity must be required required  Validating as not empty, valid integer.
  if (!body.quantity || isNaN(body.quantity)) {
    errorArray.push({
      field: 'quantity',
      error: 'MVPUV-8080',
      message: 'Please provide only valid \'quantity\' as numeric, length must be between 0 and 2.'
    })
  }
  // VehicleCategoryId must be required required  Validating as not empty, valid integer.
  if (!body.VehicleCategoryId || !isInteger(body.VehicleCategoryId)) {
    errorArray.push({
      field: 'VehicleCategoryId',
      error: 'MVPUV-8081',
      message: 'Please provide only valid \'VehicleCategoryId\' as numeric,.'
    })
  }
  // UserId must be required required  Validating as not empty, valid integer.
  if (!body.UserId || isNaN(body.UserId)) {
    errorArray.push({
      field: 'UserId',
      error: 'MVPUV-8082',
      message: 'Please provide only valid \'UserId\' as numeric,.'
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'userVehicle.middleware.validatePostUserVehicle')
  }
  validatedBody.licensePlate = body.licensePlate
  validatedBody.quantity = body.quantity
  validatedBody.VehicleCategoryId = body.VehicleCategoryId
  validatedBody.UserId = body.UserId

  req.validatedBody = validatedBody
  done()
}

const validateUpdateUserVehicleId = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const body = req.body
  const validatedBody = {}

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVUUV-8080',
      message: 'Please provide only valid \'UserVehicleId\' as numeric.'
    })
    if (!body) {
      errorArray.push({
        field: 'id',
        error: 'MVUUV-8081',
        message: 'Please provide data for update \'UserVehicle\'.'
      })
    }
    if (body.hasOwnProperty('VehicleCategoryId') && body.VehicleCategoryId) {
      if (isNaN(body.VehicleCategoryId)) {
        errorArray.push({
          field: 'VehicleCategoryId',
          error: 'MVUUV-8082',
          message: 'Please provide only valid \'VehicleCategoryId\' as numeric.'
        })
      }
      validatedBody.VehicleCategoryId = body.VehicleCategoryId
    }
  }
  if (body.hasOwnProperty('licensePlate') && body.licensePlate) {
    if (!_.isString(body.licensePlate) || body.licensePlate.length < 2 || body.licensePlate.length > 20) {
      errorArray.push({
        field: 'licensePlate',
        error: 'MVUUV-8083',
        message: 'Please provide only valid \'licensePlate\' as string, length must be between 2 and 20.'
      })
    }
    validatedBody.licensePlate = body.licensePlate
  }
  if (body.hasOwnProperty('quantity') && body.quantity) {
    if (!body.quantity || isNaN(body.quantity)) {
      errorArray.push({
        field: 'quantity',
        error: 'MVUUV-8084',
        message: 'Please provide only valid \'quantity\' as numeric, length must be between 0 and 2.'
      })
    }
    validatedBody.quantity = body.quantity
  }
  if (body.hasOwnProperty('UserId') && body.UserId) {
    if (!body.UserId || isNaN(body.UserId)) {
      errorArray.push({
        field: 'UserId',
        error: 'MVUUV-8085',
        message: 'Please provide only valid \'UserId\' as numeric,.'
      })
    }
    validatedBody.UserId = body.UserId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'userVehicle.middleware.validateUpdateUserVehicleId')
  }
  req.validatedBody = validatedBody
  done()
}
const validateDeleteUserVehicleId = (req, res, done) => {
  const errorArray = []
  const params = req.params
  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVDUV-8080',
      message: 'Please provide only valid \'UserVehicleId\' as numeric.'
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'userVehicle.middleware.validateUpdateUserVehicleId')
  }
  done()
}
module.exports = {
  validateGetUserVehicle,
  validatePostUserVehicle,
  validateUpdateUserVehicleId,
  validateDeleteUserVehicleId
}
