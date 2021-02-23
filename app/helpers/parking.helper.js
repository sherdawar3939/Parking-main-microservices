'use strict'

// var Sequelize = require('sequelize')
// const Op = Sequelize.Op
const db = require('../config/sequelize.config')
    // const _ = require('lodash')

/** Create Creative Requests */
function createParkingHelper(data) {
    return db.Parking.create(data)
}
/** Fetch Creative Request List */
function ActiveParkingListHelper(conditions, limit, offset) {
    let parkingWhere = {}
    let includes = [{
        model: db.ParkingZone,
        as: 'parkingZone',
        attributes: ['zip', 'fee']
    }]

    if (conditions.ParkingZoneId) {
        parkingWhere.ParkingZoneId = conditions.ParkingZoneId
    }

    if (conditions.status) {
        parkingWhere.status = conditions.status
    }

    if (conditions.VehicleCategoryId) {
        includes.push({
            model: db.UserVehicle,
            attributes: [],
            where: {
                VehicleCategoryId: conditions.VehicleCategoryId,
                isDeleted: false
            },
            required: true
        })
    }

    return db.Parking.findAll({
        where: parkingWhere,
        limit: limit,
        offset: offset,
        include: includes
    })
}

module.exports = {
    createParkingHelper,
    ActiveParkingListHelper
}