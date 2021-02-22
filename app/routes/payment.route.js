'use strict'
const paymentMiddleware = require('../middlewares/payment.middleware')
const paymentController = require('../controllers/payment.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // get user vehicle

  app.post(`${route}/payment`, paymentMiddleware.validatePostPayment, paymentController.addPayment)
  app.get(`${route}/payment`, paymentMiddleware.validateGetPayment, paymentController.getPayment)
}
