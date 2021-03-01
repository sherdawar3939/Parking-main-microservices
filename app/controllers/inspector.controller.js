'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { createInspector } = require('../helpers/inspector.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const addinspector = (req, res, next) => {
  return createInspector(req.validatedBody, res, next)
    .then(function (data) {
      generalController.successResponse(res, 'Inspector add successfully.', data, 'inpector.controller.addinspector')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Inspector.controller.addinspector', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Inspector.controller.addinspector', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = { addinspector }
