'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const _ = require('lodash')

// fetch VehicleCategory
function getVehicleCategory(conditions) {
    return db.VehicleCategory.findAll({
        where: conditions

    })
}

// Delete VehicleCategory
function deleteVehicleCategory(id) {
    return db.VehicleCategory.update({ isDeleted: true }, {
        where: { id }
    })
}

module.exports = {
    deleteVehicleCategory,
    getVehicleCategory
}