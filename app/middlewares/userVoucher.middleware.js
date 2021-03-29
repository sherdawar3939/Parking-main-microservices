'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validatePostUserVoucher = (req, res, done) => {
  const body = req.body
  const errorArray = []
  const validatedUserData = {}

  // validating UserVehicleId
  if (!body.UserVehicleId || isNaN(body.UserVehicleId)) {
    errorArray.push({
      field: 'UserVehicleId',
      error: 2345,
      message: 'The UserVehicleId is required as numeric.'
    })
  }

  // validating VoucherId
  if (!body.VoucherId || isNaN(body.VoucherId)) {
    errorArray.push({
      field: 'VoucherId',
      error: 2345,
      message: 'The VoucherId is required as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'inspector.middleware.validatePostUserVoucher')
  }

  validatedUserData.VoucherId = body.VoucherId
  validatedUserData.UserVehicleId = body.UserVehicleId
  validatedUserData.UserId = req.user.id
  req.validatedUserData = validatedUserData
  done()
}

const validateUpdateUserVoucher = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // paymentStatus Optional Validating as not empty, valid String and length range.
  if (body.paymentStatus) {
    if (!_.isString(body.paymentStatus) || body.paymentStatus.length > 50) {
      errorArray.push({
        field: 'paymentStatus',
        error: 25,
        message: 'Please provide only valid \'paymentStatus\' as string, length must be between 2 and 20.'
      })
    }
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parkingZone.middleware.validateUpdateUserVoucher')
  }
  validatedBody.paymentStatus = body.paymentStatus

  req.validatedBody = validatedBody
  done()
}

const validateGetUserVoucher = (req, res, done) => {
  const errorArray = []
  if (isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 80140,
      message: "Please provide only valid 'id' as number."
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'userVoucher.middleware.validateGetUserVoucher')
  }
  done()
}

const validateGetUserVoucherList = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  if (query.hasOwnProperty('VoucherId') && query.VoucherId) {
    validatedConditions.VoucherId = query.VoucherId
  }

  if (query.hasOwnProperty('UserVehicleId') && query.UserVehicleId) {
    validatedConditions.UserVehicleId = query.UserVehicleId
  }

  if (query.hasOwnProperty('paymentStatus') && query.paymentStatus) {
    validatedConditions.paymentStatus = query.paymentStatus
  }

  if (query.hasOwnProperty('UserId') && query.UserId) {
    validatedConditions.UserId = query.UserId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'userVoucher.middleware.validateGetUserVouvherList')
  }
  req.conditions = validatedConditions
  done()
}

module.exports = { validatePostUserVoucher, validateUpdateUserVoucher, validateGetUserVoucher, validateGetUserVoucherList }
