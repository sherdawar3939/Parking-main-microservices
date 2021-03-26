'use strict'
const db = require('../config/sequelize.config')
const generalHelper = require('./general.helper')
// fetch VehicleCategory
function createVoucherHelper (body, status) {
  return db.Client.findOne({ raw: true, where: { id: body.ClientId } })
    .then(client => {
      console.log(client.type)
      if (client.type === 'Government') {
        body.uid = generalHelper.createUid(0, body.zip, status)
      } else if (client.type === 'Private') {
        db.db.ParkingZone.findOne({ raw: true, where: { zip: body.zip, ClientId: body.ClientId } })
          .then(parkingZone => {
            console.log(parkingZone)
          })
        // body.uid = generalHelper.createUid(9, body.zip, status)
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
