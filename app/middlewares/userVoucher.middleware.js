'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validatePostInspector = (req, res, done) => {
  const body = req.body
  const errorArray = []
  const validatedUserData = {}
  const validatedInspectorData = {}
  if (req.user && req.user.RoleId === 2 && req.user.employeeId) {
    validatedInspectorData.ClientId = req.user.employeeId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'inspector.middleware.validatePostInspector')
  }

  validatedUserData.email = body.email

  req.validatedUserData = validatedUserData
  req.validatedInspectorData = validatedInspectorData
  done()
}

const validateUpdateInspector = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // lName must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.lName) || body.lName.length > 50) {
    errorArray.push({
      field: 'lName',
      error: 25,
      message: 'Please provide only valid \'lName\' as string, length must be between 2 and 20.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parkingZone.middleware.validateUpdateParkingZone')
  }
  validatedBody.fName = body.fName
  validatedBody.lName = body.lName
  validatedBody.email = body.email

  req.validatedBody = validatedBody
  done()
}

const validateInspectorUser = (req, res, done) => {
  const errorArray = []
  if (isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 80140,
      message: "Please provide only valid 'id' as number."
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'inspector.middleware.validateIspectorUser')
  }
  done()
}

const validateGetInspectorUser = (req, res, done) => {
  const errorArray = []
  if (isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 80140,
      message: "Please provide only valid 'id' as number."
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'inspector.middleware.validateGetInspectorUser')
  }
  done()
}

const validateInspectorsList = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  let limit = 50
  let offset = 0
  if (query.hasOwnProperty('fName') && query.fName) {
    validatedConditions.search = query.search
  }

  if (query.hasOwnProperty('lName') && query.lName) {
    validatedConditions.lName = query.lName
  }

  if (query.hasOwnProperty('status') && query.status) {
    validatedConditions.status = query.status
  }

  if (query.hasOwnProperty('email') && query.email) {
    validatedConditions.email = query.email
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
  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}

module.exports = { validatePostInspector, validateUpdateInspector, validateInspectorUser, validateGetInspectorUser, validateInspectorsList }
