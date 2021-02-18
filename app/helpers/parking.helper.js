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

// function getActiveParkingList(conditions) {
//     const where = {}

//     if (conditions.ClientId) {
//         where.ClientId = conditions.ClientId
//     }

//     if (conditions.status) {
//         where.status = conditions.status
//     }

//     if (conditions.search) {
//         where[[Op.or]] = {
//             qty: {
//                 [Op.like]: '%' + conditions.search + '%'
//             }
//         }
//     }
//     return db.CreativeRequest.findAll({
//         raw: true,
//         nest: false,
//         where
//     })
// }
function ActiveParkingListHelper(conditions) {
    return db.Parking.findAll({
        where: conditions
    })
}


module.exports = {
    createParkingHelper,
    ActiveParkingListHelper
}