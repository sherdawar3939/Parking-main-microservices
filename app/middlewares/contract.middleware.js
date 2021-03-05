'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetContractList = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validateConditions = {}

  if (query.hasOwnProperty('id') && !isNaN(query.id)) {
    validateConditions.id = query.id
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

  req.conditions = validateConditions
  req.limit = query.limit && query.limit > 0 ? parseInt(query.limit) : 50
  req.offset = query.offset && query.offset > 0 ? parseInt(query.offset) : 0
  done()
}

const validateGetContract = (req, res, done) => {
  const errorArray = []
  if (!isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 80140,
      message: "Please provide only valid 'id' as number."
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'contract.middleware.getContract')
  }

  // req.conditions = validateConditions
  // req.limit = query.limit && query.limit > 0 ? parseInt(query.limit) : 50
  // req.offset = query.offset && query.offset > 0 ? parseInt(query.offset) : 0
  done()
}

const validateCreateContract = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  if (!body.data || !isNaN(body.data)) {
    errorArray.push({
      field: 'data',
      error: 80140,
      message: "Please provide only valid 'data' as string."
    })
    // validatedBody.data = body.data
  }

  if (!body.status || !isNaN(body.status)) {
    errorArray.push({
      field: 'status',
      error: 80140,
      message: "Please provide only valid 'status' as string."
    })
    // validatedBody.status = body.status
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'contract.middleware.validateCreateContract')
  }

  validatedBody.data = body.data
  validatedBody.status = body.status

  req.validatedBody = validatedBody
  done()
}

const validateVerifyContract = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const validatedBody = {}
  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 80140,
      message: "Please provide only valid 'id' as numeric."
    })
  }

  if (params.hasOwnProperty('id') && !isNaN(params.id)) {
    validatedBody.id = params.id
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'contract.middleware.validateVerifyContract')
  }
  req.validatedBody = validatedBody
  done()
}

const validateContractApproved = (req, res, done) => {
  const query = req.query
  const errorArray = []
  const validatedConditions = {}
  if (req.user && req.user.RoleId === 2 && req.user.employeeId) {
    validatedConditions.ClientId = req.user.employeeId
  } else {
    // validating as optional number field
    if (query.hasOwnProperty('clientId') && query.clientId) {
      if (isNaN(query.clientId) || query.clientId < 1 || query.clientId > 9999999999) {
        errorArray.push({
          field: 'clientId',
          error: 'cmca-5',
          message: 'The clientId should be number with min 1 and max 9999999999 value.'
        })
      }
      validatedConditions.ClientId = query.clientId
    }
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'client.middleware.validateContractApproved')
  }
  req.validatedConditions = validatedConditions
  done()
}
module.exports = {
  validateGetContractList,
  validateVerifyContract,
  validateCreateContract,
  validateContractApproved,
  validateGetContract }
