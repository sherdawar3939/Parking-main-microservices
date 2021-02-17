'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('./general.helper')

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
