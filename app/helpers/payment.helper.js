'use strict'
const db = require('../config/sequelize.config')
var sequelize = require('sequelize')
const generalHelpingMethods = require('../helpers/general.helper')
const Op = sequelize.Op

const addpayment = (data) => {
  return db.Client.findOne({
    raw: true,
    where: {
      id: data.ClientId
    }
  })
    .then((client) => {
      if (data.amount > client.balance) {
        return generalHelpingMethods.rejectPromise({
          field: 'amount',
          error: 'HAPM-0001',
          message: 'amount greater then client balance.'
        })
      }
      const balance = client.balance - data.amount
      db.Client.update({ balance: balance }, {
        where: {
          id: data.ClientId
        }
      })
      return db.Payment.create(data)
    })
}

function getpayment (conditions, limit, offset) {
  let where = {}

  if (conditions.ClientId) {
    where.ClientId = conditions.ClientId
  }

  if (conditions.paymentStatus) {
    where.paymentStatus = conditions.paymentStatus
  }

  if (conditions.fromDate) {
    where = [sequelize.where(sequelize.fn('date', sequelize.col('Payment.createdAt')), '>=', conditions.fromDate)]
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
      as: 'clientPayments',
      where: {
        isProfile: true
      }
    },
    order: [
      ['createdAt', 'DESC']
    ],
    limit: limit,
    offset: offset
  })
}

module.exports = {
  addpayment,
  getpayment
}
