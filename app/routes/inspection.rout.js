'use strict'
const { getActiveParkingStatus, getInspection } = require('../controllers/inspection.controller')
const { validateGetInspection, validateGetParkingStatus } = require('../middlewares/inspection.middleware')
const passport = require('./../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/parkingStatus', passport.authenticate('jwt', { session: false }), validateGetParkingStatus, getActiveParkingStatus)
  app.get(route + '/inspection', passport.authenticate('jwt', { session: false }), validateGetInspection, getInspection)
}
