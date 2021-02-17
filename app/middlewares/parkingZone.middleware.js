'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const validateGetparkingZone = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0
  if (query.hasOwnProperty('uid') && query.uid) {
    if (isNaN(query.uid)) {
      errorArray.push({
        field: 'uid',
        error: 25,
        message: 'Please provide only valid \'uid\' as numeric.'
      })
    }
    validatedConditions.uid = query.uid
  }

  // validating as optional string field
  if (query.hasOwnProperty('ClientZipCodeId') && query.ClientZipCodeId) {
    if (isNaN(query.ClientZipCodeId)) {
      errorArray.push({
        field: 'ClientZipCodeId',
        error: 26,
        message: 'Please provide only valid \'ClientZipCodeId\' as numeric.'
      })
      validatedConditions.ClientZipCodeId = query.ClientZipCodeId
    }
  }
  if (query.hasOwnProperty('zip') && query.zip) {
    if (!_.isString(query.zip)) {
      errorArray.push({
        field: 'zip',
        error: 26,
        message: 'Please provide only valid \'zip\' as string.'
      })
      validatedConditions.zip = query.zip
    }
  }
  if (query.limit && query.limit > 0) {
    limit = parseInt(query.limit)
  }

  if (query.offset && query.offset > 0) {
    offset = parseInt(query.offset)
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validateGetParkingZone')
  }

  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset

  done()
}
module.exports = {
  validateGetparkingZone
}
