'use strict'
const { validateCreateRequest, validateGetCreativeRequest, validateGetCreatives, validateUpdateRequest } = require('../middlewares/creativeRequest.middleware')
const { createCreativeRequest, getCreativeRequestList, getCreative, updateCreativeRequests } = require('../controllers/creativeRequest.controller')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  // get categories of vehicle
  app.post(route + '/creative', passport.authenticate('jwt', { session: false }), validateCreateRequest, createCreativeRequest)
  app.get(route + '/creative', passport.authenticate('jwt', { session: false }), validateGetCreativeRequest, getCreativeRequestList)
  app.get(route + '/creative/:id', passport.authenticate('jwt', { session: false }), validateGetCreatives, getCreative)
  app.put(route + '/creative/:id', passport.authenticate('jwt', { session: false }), validateUpdateRequest, updateCreativeRequests)
}
