'use strict'
const { validateCreateRequest, validateGetCreativeRequest, validateGetCreatives, validateUpdateRequest } = require('../middlewares/creativeRequest.middleware')
const { createCreativeRequest, getCreativeRequestList, getCreative, updateCreativeRequests } = require('../controllers/creativeRequest.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // get categories of vehicle
  app.post(route + '/creative', validateCreateRequest, createCreativeRequest)
  app.get(route + '/creative', validateGetCreativeRequest, getCreativeRequestList)
  app.get(route + '/creative/:id', validateGetCreatives, getCreative)
  app.put(route + '/creative/:id', validateUpdateRequest, updateCreativeRequests)
}
