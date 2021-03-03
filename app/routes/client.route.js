'use strict'
const clientMiddleware = require('../middlewares/client.middleware')
const ClientController = require('../controllers/client.controller')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion
  // get client list
  app.get(`${route}/client`, clientMiddleware.validateGetClient, ClientController.getClient)
  app.get(`${route}/client/:id`, clientMiddleware.validateGetClientId, ClientController.getClientById)
  app.post(`${route}/client`, passport.authenticate('jwt', { session: false }), clientMiddleware.validatePostClient, ClientController.addClient)
  app.put(`${route}/client/:id`, clientMiddleware.validatePutClient, ClientController.UpDateClientById)
  app.get(`${route}/client/zipCode/:id`, clientMiddleware.validateGetClientId, ClientController.getClientZipCode)
}
