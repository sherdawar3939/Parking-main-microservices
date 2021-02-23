'use strict'
const vehicleCategoryMiddleware = require('../middlewares/vehicleCategory.middleware')
const vehicleCategoryController = require('../controllers/vehicleCategory.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  app.post(route + '/vehicle/category', vehicleCategoryController.createVehicleCategory)
  app.get(route + '/vehicle/category', vehicleCategoryMiddleware.validateGetVehicleCategory, vehicleCategoryController.getVehicleCategory)
  app.delete(route + '/vehicle/category/:id', vehicleCategoryController.deleteVehicleCategory)
}
