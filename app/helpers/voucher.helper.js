'use strict'
const db = require('../config/sequelize.config')
const generalHelper = require('./general.helper')
// fetch VehicleCategory
function createVoucherHelper (body, status) {
  return db.Client.findAll({ where: { id: body.ClientId } })
    .then(client => {
      console.log(client[0].dataValues.type)
      if (client[0].dataValues.type === 'Government') {
        body.uid = generalHelper.createUid(0, body.zip, status)
      } else if (client[0].dataValues.type === 'Private') {
        body.uid = generalHelper.createUid(9, body.zip, status)
      }
      console.log(body, 'status', status, 'id')
    })

  // return db.Voucher.create(body)
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
