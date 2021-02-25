'use strict'

const db = require('../config/sequelize.config')
    // fetch banners
function getUserVehicle(conditions) {
    return db.UserVehicle.findAll({
        where: conditions
    })
}

function addUserVehicle(data) {
    return db.UserVehicle.create({ licensePlate: data.licensePlate, quantity: data.quantity, VehicleCategoryId: data.VehicleCategoryId })
}

function updateUserVehicle(id, data) {
    return db.UserVehicle.update(data, {
        where: {
            id
        }
    })
}

function deleteUserVehicle(id) {
    return db.UserVehicle.update({ isDeleted: false }, {
        where: {
            id
        }
    })
}
module.exports = {
    getUserVehicle,
    addUserVehicle,
    updateUserVehicle,
    deleteUserVehicle
}