'use strict'
const clientMiddleware = require('../middlewares/client.middleware')
const ClientController = require('../controllers/client.controller')
const generalMiddleware = require('../middlewares/general.middleware')

const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // get client list
  app.get(`${route}/client`, clientMiddleware.validateGetClient, ClientController.getClient)
}
