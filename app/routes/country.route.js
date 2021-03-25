'use strict'
const countryController = require('../controllers/country.controller')
const countryMiddleware = require('../middlewares/country.middleware')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/country', passport.authenticate('jwt', { session: false }), countryMiddleware.validateGetCountry, countryController.getCountry)
}
