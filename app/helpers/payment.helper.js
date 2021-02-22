'use strict'
const db = require('../config/sequelize.config')

function addpayment (data) {
  return db.Payment.create(data)
}

function getpayment (Conditions) {
  return db.Client.findAll({
    nest: false,
    raw: true,
    include: {
      model: db.Payment,
      as: 'clientPayments'
    }
  })
}
module.exports = {
  addpayment,
  getpayment
}
