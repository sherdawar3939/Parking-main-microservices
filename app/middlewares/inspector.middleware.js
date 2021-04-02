'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validatePostInspector = (req, res, done) => {
  const body = req.body
  // get all the errors in an array
  const errorArray = []
  const validatedUserData = {}
  const validatedInspectorData = {}
  if (req.user && req.user.RoleId === 2 && req.user.employeeId) {
    validatedInspectorData.ClientId = req.user.employeeId
  }
  // fName is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.fName) || !_.isString(body.fName) || body.fName.length < 2 || body.fName.length > 100) {
    errorArray.push({
      field: 'fName',
      error: 'MVPI-8060',
      message: '\'fName\' is required as string, length must be between 2 and 100.'
    })
  }

  // lName is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('lName') && body.lName) {
    if (!_.isString(body.lName) || body.lName.length < 2 || body.lName.length > 100) {
      errorArray.push({
        field: 'lName',
        error: 'MVGCR-8061',
        message: 'Please provide only valid \'lName\' as string, length must be between 2 and 100.'
      })
    }
  }

  // email is an required string property, if it is given than validate it.
  if (body.hasOwnProperty('email') && body.email) {
    if (_.isEmpty(body.email) || !_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
      errorArray.push({
        field: 'email',
        error: 'MVGCR-8062',
        message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
      })
    }
  }
  // validating as required number field
  if (_.isEmpty(body.password) || !_.isString(body.password) || body.password.length < 8 || body.password.length > 16) {
    errorArray.push({
      field: 'password',
      error: 'MVGCR-8063',
      message: 'The field is required with min 8 and max 16 value.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'inspector.middleware.validatePostInspector')
  }

  validatedUserData.fName = body.fName
  validatedUserData.lName = body.lName
  validatedUserData.email = body.email
  validatedUserData.password = body.password
  validatedUserData.RoleId = 4
  validatedUserData.isVerified = true
  req.validatedUserData = validatedUserData
  req.validatedInspectorData = validatedInspectorData
  done()
}
// lName is an optional string property, if it is given than validate
const validateUpdateInspector = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // fName must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.fName) || body.fName.length > 50) {
    errorArray.push({
      field: 'fName',
      error: 'MVGCR-8063',
      message: 'Please provide only valid \'fName\' as string,'
    })
  }
  // lName must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.lName) || body.lName.length > 50) {
    errorArray.push({
      field: 'lName',
      error: 'MVGCR-8064',
      message: 'Please provide only valid \'lName\' as string, length must be between 2 and 20.'
    })
  }

  // email is an required string property, if it is given than validate it.
  if (body.hasOwnProperty('email') && body.email) {
    if (_.isEmpty(body.email) || !_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
      errorArray.push({
        field: 'email',
        error: 'MVGCR-8065',
        message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
      })
    }
    validatedBody.email = body.email
  }
  if (body.hasOwnProperty('password') && body.password) {
    if (_.isEmpty(body.password) || !_.isString(body.password) || body.password.length < 8 || body.password.length > 16) {
      errorArray.push({
        field: 'password',
        error: 'MVGCR-8066',
        message: 'The field is required with min 8 and max 16 value.'
      })
    }
    validatedBody.password = body.password
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
      error: 'MVIU-8060',
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
      error: 'MVGCU-8060',
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
  if (req.user && req.user.RoleId === 2 && req.user.employeeId) {
    validatedConditions.ClientId = req.user.employeeId
  } else if (query.hasOwnProperty('ClientId') && query.ClientId && !isNaN(query.ClientId)) {
    validatedConditions.ClientId = query.ClientId
  }
  if (query.hasOwnProperty('search') && query.search) {
    validatedConditions.search = query.search
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
