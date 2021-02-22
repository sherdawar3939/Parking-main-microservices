'use strict'
const db = require('../config/sequelize.config')

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