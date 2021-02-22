'use strict'
const { validateCreateRequest, validateGetCreativeRequest } = require('../middlewares/creativeRequest.middleware')
const { createCreativeRequest, getCreativeRequestList } = require('../controllers/creativeRequest.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // get categories of vehicle
  app.post(route + '/creative', validateCreateRequest, createCreativeRequest)
  app.get(route + '/creative', validateGetCreativeRequest, getCreativeRequestList)
}
