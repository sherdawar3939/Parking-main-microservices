'use strict'
const { createVehicleCategory, validateGetVehicleCategory, validateDeleteVehicleCategoryId } = require('../middlewares/vehicleCategory.middleware')
const vehicleCategoryController = require('../controllers/vehicleCategory.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  app.post(route + '/vehicle/category', createVehicleCategory, vehicleCategoryController.createVehicleCategory)
  app.get(route + '/vehicle/category', validateGetVehicleCategory, vehicleCategoryController.getVehicleCategory)
  app.delete(route + '/vehicle/category/:id', validateDeleteVehicleCategoryId, vehicleCategoryController.deleteVehicleCategory)
}
