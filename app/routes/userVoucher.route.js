'use strict'
// const {} = require('../middlewares/userVoucher.middleware')
const { addUserVoucher, getUserVouchersList, getUserVoucher, updateUserVoucherById, deleteUserVoucher } = require('../controllers/userVoucher.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  app.post(`${route}/user-voucher`, passport.authenticate('jwt', { session: false }), addUserVoucher)
  app.get(`${route}/user-voucher`, passport.authenticate('jwt', { session: false }), getUserVouchersList)
  app.get(`${route}/user-voucher/:id`, passport.authenticate('jwt', { session: false }), getUserVoucher)
  app.put(`${route}/user-voucher/:id`, passport.authenticate('jwt', { session: false }), updateUserVoucherById)
  app.delete(`${route}/user-voucher/:id`, passport.authenticate('jwt', { session: false }), deleteUserVoucher)
}
