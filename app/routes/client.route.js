'use strict'
const clientMiddleware = require('../middlewares/client.middleware')
const ClientController = require('../controllers/client.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // get client list
  app.get(`${route}/client`, clientMiddleware.validateGetClient, ClientController.getClient)
  app.get(`${route}/client/:id`, clientMiddleware.validateGetClientId, ClientController.getClientById)
  app.post(`${route}/client`, clientMiddleware.validatePostClient, ClientController.addClient)
}
