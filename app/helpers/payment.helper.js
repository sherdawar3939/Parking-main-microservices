'use strict'
const db = require('../config/sequelize.config')
var Sequelize = require('sequelize')
const Op = Sequelize.Op
function addpayment (data) {
  return db.Payment.create(data)
}

function getpayment (conditions, limit, offset) {
  const where = {}

  if (conditions.ClientId) {
    where.ClientId = conditions.ClientId
  }

  if (conditions.paymentStatus) {
    where.paymentStatus = conditions.paymentStatus
  }
  if (conditions.fromDate) {
    where.paymentStatus = conditions.paymentStatus
  }
  if (conditions.fromDate && conditions.toDate) {
    where[[Op.or]] = {
      createdAt: {
        [Op.between]: [conditions.fromDate, conditions.toDate]
      }
    }
  }
  return db.Payment.findAll({
    where,
    nest: false,
    raw: true,
    include: {
      model: db.Client,
      as: 'clientPayments'
    },
    limit: limit,
    offset: offset
  })
}
module.exports = {
  addpayment,
  getpayment
}
