'use strict'
const cityController = require('../controllers/city.controller')
const cityMiddleware = require('../middlewares/city.middleware')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/city', passport.authenticate('jwt', { session: false }), cityMiddleware.validateGetCity, cityController.getCity)
}
