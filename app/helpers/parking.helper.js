'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const _ = require('lodash')

/** Create Creative Requests */
function createParkingHelper(data) {
    return db.Parking.create(data)
}
/**Fetch Creative Request List */
function ActiveParkingListHelper(conditions) {
    return db.Parking.findAll({
        where: conditions,
        limit: limit,
        offset: offset
    })
}


module.exports = {
    createParkingHelper,
    ActiveParkingListHelper
}