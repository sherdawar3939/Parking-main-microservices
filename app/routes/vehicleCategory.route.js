'use strict'
const vehicleCategoryMiddleware = require('../middlewares/vehicleCategory.middleware')
const vehicleCategoryController = require('../controllers/vehicleCategory.controller')
const generalMiddleware = require('../middlewares/general.middleware')

const passport = require('../config/passport')

module.exports = function(app, apiVersion) {
    const route = apiVersion

    // get categories of vehicle
    app.get(route + '/vehicle-category', vehicleCategoryMiddleware.validateGetVehicleCategory, vehicleCategoryController.getVehicleCategory)
    app.delete(route + '/vehicle-category/:id', vehicleCategoryMiddleware.validateDeleteVehicleCategoryId, vehicleCategoryController.deleteVehicleCategory)
}