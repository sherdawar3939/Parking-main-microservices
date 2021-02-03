'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash');

// **********************************
// POST Unit  Middleware
// **********************************

const validatePostLaptop = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // name must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.name) || body.name.length < 2 || body.name.length > 50) {
    errorArray.push({
      field: 'name',
      error: 90000,
      message: 'Please provide only valid \'name\' as string, length must be between 2 and 50.'
    })
  }

  // name must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.description) || body.description.length < 5 || body.description.length > 500) {
    errorArray.push({
      field: 'description',
      error: 90010,
      message: 'Please provide only valid \'description\' as string, length must be between 10 and 500.'
    })
  }
  // name must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.price) || body.price.length < 2 || body.price.length > 50) {
    errorArray.push({
      field: 'price',
      error: 90010,
      message: 'Please provide only valid \'price\' as string, length must be between 2 and 50.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'laptop.middleware.validatePostLaptop')
  }
  validatedBody.name = body.name
  validatedBody.description = body.description
  validatedBody.price = body.price
  req.validatedBody = validatedBody
  done()
}

// ********************
// Get Laptops
// ********************

const validateGetLaptop = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  // id is an optional numeric, if it is given than validate it.
  if (query.hasOwnProperty('id') && query.id) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.id)) {
      errorArray.push({
        field: 'id',
        error: 60000,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.id = query.id
  }

  if (query.hasOwnProperty('name') && query.name) {
      if (query.name.length > 500) {
          errorArray.push({
              field: 'name',
              error: 87687,
              message: 'Name cannot be greater then 500 characters'
          })
      }
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validateGetLaptop')
  }
  req.conditions = validatedConditions
  done()
}

// ***********************************
// Validate Delete Laptop
// ************************************

const validateDeleteLaptop = (req, res, done) => {
  const errorArray = []
  const params = req.params

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 80140,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'laptop.middleware.validateDeleteLaptop')
  }
  done()
}
// **********************************
// Update Laptop
// **********************************

const validateUpdateLaptop = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const id = req.params
  const validatedConditions = {}

  // Must Be Required Validating as not empty, valid numeric value with range.
  if (!id.id || isNaN(id.id)) {
    errorArray.push({
      field: 'id',
      error: 80070,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

// name must be required required  Validating as not empty, valid String and length range.
if (!_.isString(body.name) || body.name.length < 2 || body.name.length > 50) {
  errorArray.push({
    field: 'name',
    error: 90000,
    message: 'Please provide only valid \'name\' as string, length must be between 2 and 50.'
  })
}

// name must be required required  Validating as not empty, valid String and length range.
if (!_.isString(body.description) || body.description.length < 5 || body.description.length > 500) {
  errorArray.push({
    field: 'description',
    error: 90010,
    message: 'Please provide only valid \'description\' as string, length must be between 10 and 500.'
  })
}
// name must be required required  Validating as not empty, valid String and length range.
if (!_.isString(body.price) || body.price.length < 2 || body.price.length > 50) {
  errorArray.push({
    field: 'price',
    error: 90010,
    message: 'Please provide only valid \'price\' as string, length must be between 2 and 50.'
  })
}

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'laptop.middleware.validateUpdateLaptop')
  }
  // validatedConditions.ParentIdId = body.hasOwnProperty('ParentId') ? body.ParentIdId : null
  // req.body = validatedConditions
  // console.log(req.body);
  req.id = body.id
  
  done()
}

module.exports = {
  validateGetLaptop,
  validatePostLaptop,
  validateDeleteLaptop,
  validateUpdateLaptop
}
