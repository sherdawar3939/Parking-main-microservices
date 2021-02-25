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
        attributes: ['uid', 'zip', 'fee']
    }]

    if (conditions.ParkingZoneId) {
        parkingWhere.ParkingZoneId = conditions.ParkingZoneId
    }

    if (conditions.status === 'Active') {
        parkingWhere.status = conditions.status
    }

    if (conditions.VehicleCategoryId) {
        includes.push({
            model: db.UserVehicle,
            as: 'parkingUserVehicle',
            attributes: [],
            where: {
                VehicleCategoryId: conditions.VehicleCategoryId,
                isDeleted: false
            },
            required: true
        })
    }
}

module.exports = {
    createParkingHelper,
    ActiveParkingListHelper
}