'use strict'
const paymentMiddleware = require('../middlewares/payment.middleware')
const paymentController = require('../controllers/payment.controller')
// const generalMiddleware = require('../middlewares/general.middleware')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // get user vehicle

  app.post(`${route}/payment`, passport.authenticate('jwt', { session: false }), paymentMiddleware.validatePostPayment, paymentController.addPayment)
  app.get(`${route}/payment`, passport.authenticate('jwt', { session: false }), paymentMiddleware.validateGetPayment, paymentController.getPayment)
}
