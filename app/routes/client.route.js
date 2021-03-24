'use strict'
const clientMiddleware = require('../middlewares/client.middleware')
const ClientController = require('../controllers/client.controller')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  // get client list
  app.get(`${route}/client`, passport.authenticate('jwt', { session: false }), clientMiddleware.validateGetClient, ClientController.getClient)

  app.get(`${route}/client/:id`, passport.authenticate('jwt', { session: false }), clientMiddleware.validateGetClientId, ClientController.getClientById)

  app.post(`${route}/client`, passport.authenticate('jwt', { session: false }), clientMiddleware.uploadFile.fields([{ name: 'files' }]), clientMiddleware.validatePostClient, ClientController.addClient)

  app.put(`${route}/client/:id`, passport.authenticate('jwt', { session: false }), clientMiddleware.validatePutClient, ClientController.UpDateClientById)

  app.get(`${route}/client/:id/zip-code`, passport.authenticate('jwt', { session: false }), clientMiddleware.validateGetClientId, ClientController.getClientZipCode)
}
