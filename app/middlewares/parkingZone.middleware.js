'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const validateGetparkingZone = (req, res, done) => {
    console.log('parking zone call')
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
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

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validateGetParkingZone')
  }

  req.conditions = validatedConditions
  done()
}
module.exports = {
  validateGetparkingZone
}
