'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('./general.helper')

function addPayment(data) {
    return db.Payment.create(data)
}

function getPayment(Conditions) {
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
    addPayment,
    getPayment
}