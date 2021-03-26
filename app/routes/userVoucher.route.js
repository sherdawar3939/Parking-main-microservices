'use strict'
const { validatePostUserVoucher, validateUpdateUserVoucher, validateGetUserVoucher, validateGetUserVoucherList } = require('../middlewares/userVoucher.middleware')
const { addUserVoucher, getUserVouchersList, getUserVoucher, updateUserVoucherById, deleteUserVoucher } = require('../controllers/userVoucher.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  app.post(`${route}/user-voucher`, passport.authenticate('jwt', { session: false }), validatePostUserVoucher, addUserVoucher)
  app.get(`${route}/user-voucher`, passport.authenticate('jwt', { session: false }), validateGetUserVoucherList, getUserVouchersList)
  app.get(`${route}/user-voucher/:id`, passport.authenticate('jwt', { session: false }), validateGetUserVoucher, getUserVoucher)
  app.put(`${route}/user-voucher/:id`, passport.authenticate('jwt', { session: false }), validateUpdateUserVoucher, updateUserVoucherById)
  app.delete(`${route}/user-voucher/:id`, passport.authenticate('jwt', { session: false }), deleteUserVoucher)
}
