'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetClient = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  if (query.hasOwnProperty('search') && query.search) {
    validatedConditions.search = query.search
  }

  // validating as optional number field
  if (query.hasOwnProperty('zipcode') && query.ClientId && !isNaN(query.ClientId)) {
    validatedConditions.zipcode = query.zipcode
  }

  // validating as optional number field
  if (query.hasOwnProperty('status') && query.CityId && !isNaN(query.CityId)) {
    validatedConditions.status = query.status
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validateGetClient')
  }
  req.validatedConditions = validatedConditions
  done()
}
const validateGetClientId = (req, res, done) => {
  const errorArray = []
  const params = req.params
  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 80140,
      message: 'Please provide only valid \'Client id\' as numeric.'
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'client.middleware.validateGetClientId')
  }
  done()
}
module.exports = {
  validateGetClient,
  validateGetClientId

}