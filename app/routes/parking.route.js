'use strict'
const { validateCreateParking, validateGetParkingList, validateEndParking, validateVerifyPayment } = require('../middlewares/parking.middleware')
const { createParking, getActiveParkingList, endParking, paymentVerified } = require('../controllers/parking.controller')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.post(route + '/parking/start', passport.authenticate('jwt', { session: false }), validateCreateParking, createParking)
  app.post(route + '/parking/end', passport.authenticate('jwt', { session: false }), validateEndParking, endParking)
  app.get(route + '/parking', passport.authenticate('jwt', { session: false }), validateGetParkingList, getActiveParkingList)
  app.post(route + '/parking/verify-payment', passport.authenticate('jwt', { session: false }), validateVerifyPayment, paymentVerified)
}
