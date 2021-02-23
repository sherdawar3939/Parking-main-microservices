'use strict'
const cityController = require('../controllers/city.controller')
const cityMiddleware = require('../middlewares/city.middleware')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/city', cityMiddleware.validateGetCity, cityController.getCity)
}
