'use strict'
const voucherController = require('../controllers/voucher.controller')
const voucherMiddleware = require('../middlewares/voucher.middleware')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.post(`${route}/voucher`, passport.authenticate('jwt', { session: false }), voucherMiddleware.validatePostVoucher, voucherController.createVoucher)
  app.get(`${route}/voucher`, passport.authenticate('jwt', { session: false }), voucherMiddleware.validateGetVoucher, voucherController.getVoucher)
  app.get(`${route}/voucher/:id`, passport.authenticate('jwt', { session: false }), voucherMiddleware.validateByIdVoucher, voucherController.getVoucherById)
  app.put(`${route}/voucher/:id`, passport.authenticate('jwt', { session: false }), voucherMiddleware.validateUpdateSeasonalPass, voucherController.updateSeasonalPass)
  app.delete(`${route}/voucher/:id`, passport.authenticate('jwt', { session: false }), voucherMiddleware.validateByIdVoucher, voucherController.deleteVoucher)
}
