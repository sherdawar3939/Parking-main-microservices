'use strict'
const db = require('../config/sequelize.config')
var sequelize = require('sequelize')
const Op = sequelize.Op
function addpayment (data) {
  return db.Payment.create(data)
}

function getpayment (conditions, limit, offset) {
  let where = {}

  if (conditions.ClientId) {
    where.ClientId = conditions.ClientId
  }

  if (conditions.paymentStatus) {
    where.paymentStatus = conditions.paymentStatus
  }

  // console.log('where', conditions.fromDate.toString(), 'dsdsds', conditions.toDate.toString())
  if (conditions.fromDate) {
    where = [sequelize.where(sequelize.fn('date', sequelize.col('Payment.createdAt')), '>=', conditions.fromDate)]
    // sequelize.where(sequelize.fn('date', sequelize.col('Payment.createdAt')), '<=', conditions.toDate)
    // ]
  } else if (conditions.toDate) {
    where = [sequelize.where(sequelize.fn('date', sequelize.col('Payment.createdAt')), '<=', conditions.toDate)]
  } else if (conditions.fromDate && conditions.toDate) {
    where = {
      [Op.and]: [
        [sequelize.where(sequelize.fn('date', sequelize.col('Payment.createdAt')), '>=', conditions.fromDate)],
        [sequelize.where(sequelize.fn('date', sequelize.col('Payment.createdAt')), '<=', conditions.toDate)]

      ]
    }
  }
  return db.Payment.findAll({
    where,
    // nest: false,
    // raw: true,
    include: {
      model: db.Client,
      as: 'clientPayments'
    },
    order: [['createdAt', 'DESC']],
    limit: limit,
    offset: offset
  })
}
module.exports = {
  addpayment,
  getpayment
}
