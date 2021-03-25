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

  // validating expiryDate
  if (!body.expiryDate) {
    errorArray.push({
      field: 'expiryDate',
      error: 2345,
      message: 'The expiryDate is required.'
    })
  }

  // validating fee
  if (!body.fee || isNaN(body.fee)) {
    errorArray.push({
      field: 'fee',
      error: 2345,
      message: 'The fee is required.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'inspector.middleware.validatePostUserVoucher')
  }
  validatedUserData.fee = body.fee
  validatedUserData.expiryDate = body.expiryDate
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

  // paymentStatus must be required  Validating as not empty, valid String and length range.
  if (!_.isString(body.paymentStatus) || body.paymentStatus.length > 50) {
    errorArray.push({
      field: 'paymentStatus',
      error: 25,
      message: 'Please provide only valid \'paymentStatus\' as string, length must be between 2 and 20.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'parkingZone.middleware.validateUpdateParkingZone')
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

const validateGetUserVoucherList = (req, res, done) => {
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

module.exports = { validatePostUserVoucher, validateUpdateUserVoucher, validateGetUserVoucher, validateGetInspectorUser, validateGetUserVoucherList }
