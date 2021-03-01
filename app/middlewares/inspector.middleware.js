'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validatePostInspector = (req, res, done) => {
  const body = req.body
  // get all the errors in an array
  const errorArray = []
  const validatedData = {}
  // fName is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.fName) || !_.isString(body.fName) || body.fName.length < 2 || body.fName.length > 100) {
    errorArray.push({
      field: 'fName',
      error: 1000,
      message: '\'fName\' is required as string, length must be between 2 and 100.'
    })
  }

  // lName is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('lName') && body.lName) {
    if (!_.isString(body.lName) || body.lName.length < 2 || body.lName.length > 100) {
      errorArray.push({
        field: 'lName',
        error: 1003,
        message: 'Please provide only valid \'lName\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.lName = body.lName
  }

  // email is an required string property, if it is given than validate it.
  if (body.hasOwnProperty('email') && body.email) {
    if (_.isEmpty(body.email) || !_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
      errorArray.push({
        field: 'email',
        error: 1006,
        message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
      })
    }
    validatedData.email = body.email
  }
  // password is required, validating it as not empty, valid String and length range.
  //   if (_.isEmpty(body.password) || !_.isString(body.password) || body.password.length < 8 || body.password.length > 16) {
  //     errorArray.push({
  //       field: 'password',
  //       error: 1015,
  //       message: '\'password\' is required as string, length must be between 8 and 16.'
  //     })
  //   }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'inspector.middleware.validatePostInspector')
  }

  validatedData.fName = body.fName
  validatedData.lName = body.lName
  validatedData.email = body.email
  //   validatedData.phone = body.phone
  //   validatedData.password = body.password

  req.validatedBody = validatedData
  done()
}
module.exports = { validatePostInspector }
