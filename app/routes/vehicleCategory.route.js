'use strict'
const vehicleCategoryMiddleware = require('../middlewares/vehicleCategory.middleware')
const vehicleCategoryController = require('../controllers/vehicleCategory.controller')
const generalMiddleware = require('../middlewares/general.middleware')

const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // get categories of vehicle
  app.get(route + '/vehicle-category', vehicleCategoryMiddleware.validateGetVehicleCategory, vehicleCategoryController.getVehicleCategory)
  app.post(route + '/vehicle-category', vehicleCategoryMiddleware.createVehicleCategory, vehicleCategoryController.createVehicleCategory)

}
