'use strict'
const db = require('../config/sequelize.config')

function addPayment (data) {
  return db.Payment.create(data)
}

function getPayment (conditions) {
  return db.Client.findAll({
    where: conditions,
    nest: false,
    raw: true,
    include: {
      model: db.Payment,
      as: 'clientPayments'
    }
  })
}
module.exports = {
  addPayment,
  getPayment
}
