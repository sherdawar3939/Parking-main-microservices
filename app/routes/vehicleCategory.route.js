'use strict'
const { createVehicleCategory, validateGetVehicleCategory, validateDeleteVehicleCategoryId } = require('../middlewares/vehicleCategory.middleware')
const vehicleCategoryController = require('../controllers/vehicleCategory.controller')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion
  app.post(route + '/vehicle/category', passport.authenticate('jwt', { session: false }), createVehicleCategory, vehicleCategoryController.createVehicleCategory)
  app.get(route + '/vehicle/category', passport.authenticate('jwt', { session: false }), validateGetVehicleCategory, vehicleCategoryController.getVehicleCategory)
  app.delete(route + '/vehicle/category/:id', passport.authenticate('jwt', { session: false }), validateDeleteVehicleCategoryId, vehicleCategoryController.deleteVehicleCategory)
}
