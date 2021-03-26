'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const multer = require('multer')
const fs = require('fs')
const { promisify } = require('util')
const generalHelper = require('./../helpers/general.helper')
const unlinkAsync = promisify(fs.unlink)
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
const validatePostClient = async (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}
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

  if (!body.primaryContactPersonName || body.primaryContactPersonName.length < 3 || body.primaryContactPersonName.length > 30) {
    errorArray.push({
      field: 'primaryContactPersonName',
      error: 1001,
      message: 'The field is required with 3 min and 20 max characters.'
    })
  }

  if (_.isEmpty(body.primaryEmail) || !_.isString(body.primaryEmail) || body.primaryEmail.length < 5 || body.primaryEmail.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.primaryEmail))) {
    errorArray.push({
      field: 'primaryEmail',
      error: 1006,
      message: 'Please provide only valid \'primaryEmail\' as string, length must be between 5 and 100.'
    })
  }

  if (!body.primaryPhone || isNaN(body.primaryPhone) || body.primaryPhone.length < 11) {
    errorArray.push({
      field: 'primaryPhone',
      error: 1002,
      message: 'The field is required with 11 digit value.'
    })
  }

  if (!body.houseNo || body.houseNo.length < 1 || body.houseNo.length > 50) {
    errorArray.push({
      field: 'houseNo',
      error: 1006,
      message: 'Please provide only valid \'houseNo\' as string, length must be between 1 and 50.'
    })
  }

  if (!body.streetNo || body.streetNo.length < 1 || body.streetNo.length > 100) {
    errorArray.push({
      field: 'streetNo',
      error: 1006,
      message: 'Please provide only valid \'streetNo\' as string, length must be between 1 and 100.'
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
    await unlinkAsync(req.files.files[0].path)
    return generalMiddleware.standardErrorResponse(res, errorArray, 'client.middleware.validatePostClient', 400)
  }
  validatedBody.companyName = body.companyName
  validatedBody.email = body.email
  validatedBody.phone = body.phone
  validatedBody.secondaryContactPersonName = body.secondaryContactPersonName
  validatedBody.secondaryEmail = body.secondaryEmail
  validatedBody.secondaryPhone = body.secondaryPhone
  validatedBody.primaryContactPersonName = body.primaryContactPersonName
  validatedBody.primaryEmail = body.primaryEmail
  validatedBody.primaryPhone = body.primaryPhone
  validatedBody.houseNo = body.houseNo
  validatedBody.streetNo = body.streetNo
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
    validatedBody.companyName = body.companyName
  }

  if (body.hasOwnProperty('email') && body.email) {
    if (_.isEmpty(body.email) || !_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
      errorArray.push({
        field: 'email',
        error: 1006,
        message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
      })
    }
    validatedBody.email = body.email
  }
  // validating as required number field
  if (body.hasOwnProperty('phone') && body.phone) {
    if (!body.phone || isNaN(body.phone) || body.phone.length < 11) {
      errorArray.push({
        field: 'phone',
        error: 1002,
        message: 'The field is required with 11 min and max 11 value.'
      })
    }
    validatedBody.phone = body.phone
  }
  // validating as required number field
  if (body.hasOwnProperty('secondaryContactPersonName') && body.secondaryContactPersonName) {
    if (!body.secondaryContactPersonName || body.secondaryContactPersonName.length < 3 || body.secondaryContactPersonName.length > 30) {
      errorArray.push({
        field: 'secondaryContactPersonName',
        error: 1001,
        message: 'The field is required with 3 min and 20 max characters.'
      })
    }
    validatedBody.secondaryContactPersonName = body.secondaryContactPersonName
  }

  if (body.hasOwnProperty('secondaryEmail') && body.secondaryEmail) {
    if (_.isEmpty(body.secondaryEmail) || !_.isString(body.secondaryEmail) || body.secondaryEmail.length < 5 || body.secondaryEmail.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.secondaryEmail))) {
      errorArray.push({
        field: 'email',
        error: 1006,
        message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
      })
    }
    validatedBody.secondaryEmail = body.secondaryEmail
  }

  if (body.hasOwnProperty('secondaryPhone') && body.secondaryPhone) {
    if (!body.secondaryPhone || isNaN(body.secondaryPhone) || body.secondaryPhone.length < 11) {
      errorArray.push({
        field: 'secondaryPhone',
        error: 1002,
        message: 'The field is required with 11 digit value.'
      })
    }
    validatedBody.secondaryPhone = body.secondaryPhone
  }

  if (body.hasOwnProperty('primaryContactPersonName') && body.primaryContactPersonName) {
    if (!body.primaryContactPersonName || body.primaryContactPersonName.length < 3 || body.primaryContactPersonName.length > 30) {
      errorArray.push({
        field: 'primaryContactPersonName',
        error: 1001,
        message: 'The field is required with 3 min and 20 max characters.'
      })
    }
    validatedBody.primaryContactPersonName = body.primaryContactPersonName
  }

  if (body.hasOwnProperty('primaryEmail') && body.primaryEmail) {
    if (_.isEmpty(body.primaryEmail) || !_.isString(body.primaryEmail) || body.primaryEmail.length < 5 || body.primaryEmail.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.primaryEmail))) {
      errorArray.push({
        field: 'primaryEmail',
        error: 1006,
        message: 'Please provide only valid \'primaryEmail\' as string, length must be between 5 and 100.'
      })
    }
    validatedBody.primaryEmail = body.primaryEmail
  }

  if (body.hasOwnProperty('primaryPhone') && body.primaryPhone) {
    if (!body.primaryPhone || isNaN(body.primaryPhone) || body.primaryPhone.length < 11) {
      errorArray.push({
        field: 'primaryPhone',
        error: 1002,
        message: 'The field is required with 11 digit value.'
      })
    }
    validatedBody.primaryPhone = body.primaryPhone
  }

  if (body.hasOwnProperty('houseNo') && body.houseNo) {
    if (body.houseNo.length < 1 || body.houseNo.length > 50) {
      errorArray.push({
        field: 'houseNo',
        error: 1006,
        message: 'Please provide only valid \'houseNo\' as string, length must be between 1 and 50.'
      })
    }
    validatedBody.houseNo = body.houseNo
  }

  if (body.hasOwnProperty('streetNo') && body.streetNo) {
    if (body.streetNo.length < 1 || body.streetNo.length > 100) {
      errorArray.push({
        field: 'streetNo',
        error: 1006,
        message: 'Please provide only valid \'streetNo\' as string, length must be between 1 and 100.'
      })
    }
    validatedBody.streetNo = body.streetNo
  }

  // validating as required string field
  if (body.hasOwnProperty('address') && body.address) {
    if (!body.address || body.address.length < 5 || body.address.length > 50) {
      errorArray.push({
        field: 'address',
        error: 1007,
        message: 'The field is required with 10 min and 50 max characters.'
      })
    }
    validatedBody.address = body.address
  }

  // validating as required string field
  if (body.hasOwnProperty('iban') && body.iban) {
    if (!body.iban || body.iban.length < 5 || body.iban.length > 50) {
      errorArray.push({
        field: 'iban',
        error: 1008,
        message: 'The field is required with 10 min and 50 max characters.'
      })
      validatedBody.iban = body.iban
    }
    validatedBody.iban = body.iban
  }

  // validating as required number field
  if (body.hasOwnProperty('balance') && body.balance) {
    if (!body.balance || isNaN(body.balance)) {
      errorArray.push({
        field: 'balance',
        error: 1009,
        message: 'The field is required .'
      })
    }
    validatedBody.balance = body.balance
  }
  // validating as required number field
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'client.middleware.validatePostClient')
  }
  req.validatedBody = validatedBody
  done()
}

const imageFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(null, true)
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
  }
}

var storage = multer.diskStorage({
  destination: function (req, files, cb) {
    var dir = 'contracts'
    if (!fs.existsSync(dir)) {
      fs.mkdirSync('contracts')
    }
    cb(null, dir)
  },
  filename: async function (req, file, cb) {
    const uid = await generalHelper.getUid('Contract', 'uid', {
      type: 'General'
    }, 'I')
    req.uid = uid
    cb(null, `${uid}.pdf`)
  }
})

var uploadFile = multer({ storage: storage, fileFilter: imageFilter, limits: { fileSize: 1024 * 1024 } })
module.exports = {
  validateGetClient,
  validateGetClientId,
  validatePostClient,
  validatePutClient,
  uploadFile
}
