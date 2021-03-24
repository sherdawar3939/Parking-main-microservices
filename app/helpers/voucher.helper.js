'use strict'
const db = require('../config/sequelize.config')

// fetch VehicleCategory
function createVoucherHelper (body) {
  console.log(body)
  return db.Voucher.create(body)
}
const getVoucherHelper = (conditions) => {
  const where = {}
  if (conditions.ClientId) {
    where.ClientId = conditions.ClientId
  }
  return db.Voucher.findAll(where)
}
const getVoucherByIdHelper = (id) => {
  return db.Voucher.findAll({
    where: { id }
  })
}
module.exports = {
  createVoucherHelper,
  getVoucherHelper,
  getVoucherByIdHelper
}
