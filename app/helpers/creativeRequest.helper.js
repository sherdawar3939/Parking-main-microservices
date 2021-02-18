'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const _ = require('lodash')

/** Create Creative Requests */
function createRequest(data) {
    return db.CreativeRequest.create(data)
}
/**Fetch Creative Request List */

function getRequestList(conditions) {
    const where = {}

    if (conditions.ClientId) {
        where.ClientId = conditions.ClientId
    }

    if (conditions.status) {
        where.status = conditions.status
    }

    if (conditions.search) {
        where[[Op.or]] = {
            qty: {
                [Op.like]: '%' + conditions.search + '%'
            }
        }
    }
    return db.CreativeRequest.findAll({
        raw: true,
        nest: false,
        where
    })
}
// function getRequestList(conditions) {
//     return db.CreativeRequest.findAll({
//         where: conditions
//     })
// }


module.exports = {
    createRequest,
    getRequestList
}