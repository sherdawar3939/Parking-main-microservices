'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const multer = require('multer')
const validateGetClient = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  if (req.user && req.user.RoleId === 2) {
    validatedConditions.UserId = req.user.id
  } else if (query.hasOwnProperty('userId') && query.userId) {
    validatedConditions.UserId = query.userId
  }

  if (query.hasOwnProperty('search') && query.search) {
    validatedConditions.search = query.search
  }

  // validating as optional number field
  if (query.hasOwnProperty('status') && query.status) {
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
const validatePostClient = (req, res, done) => {
  const errorArray = []
  console.log('file', req.files)
  console.log('body', req.body)
  const body = req.body
  const validatedBody = {}
  var extension = req.files[0].name.split('.')
  if (req.files[0].type === null || (!req.files[0].type.startsWith('image') && extension[1] !== 'pdf')) {
    errorArray.push({
      field: 'files',
      error: 234,
      message: 'The files is required  .'
    })
  }
  // validating as required string field
  if (req.user && req.user.RoleId === 2) {
    validatedBody.UserId = req.user.id
    validatedBody.isProfile = true
  }
  if (!body.companyName || body.companyName.length < 3 || body.companyName.length > 30) {
    errorArray.push({
      field: 'companyName',
      error: 1001,
      message: 'The field is required with 3 min and 20 max characters.'
    })
  }
  if (_.isEmpty(body.email) || !_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
    errorArray.push({
      field: 'email',
      error: 1006,
      message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
    })
  }
  // validating as required number field
  if (!body.phone || isNaN(body.phone) || body.phone.length < 11) {
    errorArray.push({
      field: 'phone',
      error: 1002,
      message: 'The field is required with 11 min and max 11 value.'
    })
  }
  // validating as required number field
  if (!body.secondaryContactPersonName || body.secondaryContactPersonName.length < 3 || body.secondaryContactPersonName.length > 30) {
    errorArray.push({
      field: 'secondaryContactPersonName',
      error: 1001,
      message: 'The field is required with 3 min and 20 max characters.'
    })
  }
  if (_.isEmpty(body.secondaryEmail) || !_.isString(body.secondaryEmail) || body.secondaryEmail.length < 5 || body.secondaryEmail.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.secondaryEmail))) {
    errorArray.push({
      field: 'email',
      error: 1006,
      message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
    })
  }
  if (!body.secondaryPhone || isNaN(body.secondaryPhone) || body.secondaryPhone.length < 11) {
    errorArray.push({
      field: 'secondaryPhone',
      error: 1002,
      message: 'The field is required with 11 digit value.'
    })
  }
  // validating as required string field
  if (!body.address || body.address.length < 5 || body.address.length > 50) {
    errorArray.push({
      field: 'address',
      error: 1007,
      message: 'The field is required with 10 min and 50 max characters.'
    })
  }
  // validating as required string field
  if (!body.iban || body.iban.length < 5 || body.iban.length > 50) {
    errorArray.push({
      field: 'iban',
      error: 1008,
      message: 'The field is required with 10 min and 50 max characters.'
    })
  }
  // validating as required string field
  if (!body.paymentFrequency) {
    errorArray.push({
      field: 'paymentFrequency',
      error: 234,
      message: 'The paymentFrequency is required.'
    })
  }
  // validating as required number field
  if (!body.countryId || isNaN(body.countryId)) {
    errorArray.push({
      field: 'countryId',
      error: 345,
      message: 'The countryId is required .'
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'client.middleware.validatePostClient')
  }
  validatedBody.companyName = body.companyName
  validatedBody.email = body.email
  validatedBody.phone = body.phone
  validatedBody.secondaryContactPersonName = body.secondaryContactPersonName
  validatedBody.secondaryEmail = body.secondaryEmail
  validatedBody.secondaryPhone = body.secondaryPhone
  validatedBody.address = body.address
  validatedBody.iban = body.iban
  validatedBody.paymentFrequency = body.paymentFrequency
  validatedBody.CountryId = body.countryId
  req.validatedBody = validatedBody
  done()
}
const validatePutClient = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const body = req.body
  const validatedBody = {}
  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 80140,
      message: 'Please provide only valid \'Client id\' as numeric.'
    })
  }
  // validating as optional string field
  if (body.hasOwnProperty('companyName') && body.companyName) {
    if (body.companyName.length < 3 || body.companyName.length > 50) {
      errorArray.push({
        field: 'companyName',
        error: 1001,
        message: 'The field should be string with 3 min and 50 max characters.'
      })
    }
  }
  if (_.isEmpty(body.email) || !_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
    errorArray.push({
      field: 'email',
      error: 1006,
      message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
    })
  }
  // validating as required number field
  if (!body.phone || isNaN(body.phone) || body.phone.length < 11) {
    errorArray.push({
      field: 'phone',
      error: 1002,
      message: 'The field is required with 11 min and max 11 value.'
    })
  }
  // validating as required number field
  if (!body.secondaryContactPersonName || body.secondaryContactPersonName.length < 3 || body.secondaryContactPersonName.length > 30) {
    errorArray.push({
      field: 'secondaryContactPersonName',
      error: 1001,
      message: 'The field is required with 3 min and 20 max characters.'
    })
  }
  if (_.isEmpty(body.secondaryEmail) || !_.isString(body.secondaryEmail) || body.secondaryEmail.length < 5 || body.secondaryEmail.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.secondaryEmail))) {
    errorArray.push({
      field: 'email',
      error: 1006,
      message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
    })
  }
  if (!body.secondaryPhone || isNaN(body.secondaryPhone) || body.secondaryPhone.length < 11) {
    errorArray.push({
      field: 'secondaryPhone',
      error: 1002,
      message: 'The field is required with 11 digit value.'
    })
  }
  // validating as required string field
  if (!body.address || body.address.length < 5 || body.address.length > 50) {
    errorArray.push({
      field: 'address',
      error: 1007,
      message: 'The field is required with 10 min and 50 max characters.'
    })
  }
  // validating as required string field
  if (!body.iban || body.iban.length < 5 || body.iban.length > 50) {
    errorArray.push({
      field: 'iban',
      error: 1008,
      message: 'The field is required with 10 min and 50 max characters.'
    })
    validatedBody.iban = body.iban
  }
  // validating as required number field
  if (!body.balance || isNaN(body.balance)) {
    errorArray.push({
      field: 'balance',
      error: 1009,
      message: 'The field is required .'
    })
  }
  // validating as required number field

  if (!body.UserId || isNaN(body.UserId)) {
    errorArray.push({
      field: 'UserId',
      error: 1011,
      message: 'The field is required.'
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'client.middleware.validatePostClient')
  }
  validatedBody.companyName = body.companyName
  validatedBody.email = body.email
  validatedBody.phone = body.phone
  validatedBody.secondaryContactPersonName = body.secondaryContactPersonName
  validatedBody.secondaryEmail = body.secondaryEmail
  validatedBody.secondaryPhone = body.secondaryPhone
  validatedBody.address = body.address
  validatedBody.iban = body.iban
  validatedBody.balance = body.balance
  validatedBody.UserId = body.UserId
  req.validatedBody = validatedBody
  done()
}

var storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, 'images')
    console.log('call')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`)
    console.log('call')
  }
})

var uploadFile = multer({ storage: storage })
module.exports = {
  validateGetClient,
  validateGetClientId,
  validatePostClient,
  validatePutClient,
  uploadFile
}
