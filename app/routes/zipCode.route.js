'use strict'
const zipCodeController = require('../controllers/zipCode.controller')
const zipCodeMiddleware = require('../middlewares/zipCode.middleware')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  //* *********************
  // get zipCode
  //* ********************/

<<<<<<< HEAD
  app.get(route + '/zipcode', zipCodeMiddleware.validateGetZipCode, zipCodeController.getZipCode)
  app.get(`${route}/zipcode/city/:id`, zipCodeMiddleware.validateCityId, zipCodeController.getZipCodeByCityId)
=======
  app.get(route + '/zipcode', passport.authenticate('jwt', { session: false }), zipCodeMiddleware.validateGetZipCode, zipCodeController.getZipCode)
  app.get(`${route}/zip-code/:id`, passport.authenticate('jwt', { session: false }), zipCodeMiddleware.validateCityId, zipCodeController.getZipCodeByCityId)
>>>>>>> HamzaAslam
}
