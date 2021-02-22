'use strict'
const userVehicleMiddleware = require('../middlewares/userVehicle.middleware')
const UserVehicleController = require('../controllers/userVehicle.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // get user vehicle
  app.get(route + '/user-vehicle', userVehicleMiddleware.validateGetUserVehicle, UserVehicleController.getUserVehicle)
  app.post(`${route}/user-vehicle`, userVehicleMiddleware.validatePostUserVehicle, UserVehicleController.addUserVehicle)
  app.put(`${route}/user-vehicle/:id`, userVehicleMiddleware.validateUpdateUserVehicleId, UserVehicleController.updateUserVehicle)
  // app.delete(`${route}/user-vehicle/:id`, userVehicleMiddleware.validateDeleteUserVehicleId, UserVehicleController.deleteUserVehicle)
}
