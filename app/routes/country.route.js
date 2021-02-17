'use strict'
const countryController = require('../controllers/country.controller')
const countryMiddleware = require('../middlewares/country.middleware')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/country', countryMiddleware.validateGetCountry, countryController.getCountry)
}