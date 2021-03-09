'use strict'
const userVehicleMiddleware = require('../middlewares/userVehicle.middleware')
const UserVehicleController = require('../controllers/userVehicle.controller')
// const generalMiddleware = require('../middlewares/general.middleware')

const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // get user vehicle
  app.get(route + '/user-vehicle', passport.authenticate('jwt', { session: false }), userVehicleMiddleware.validateGetUserVehicle, UserVehicleController.getUserVehicle)
  app.post(`${route}/user-vehicle`, passport.authenticate('jwt', { session: false }), userVehicleMiddleware.validatePostUserVehicle, UserVehicleController.addUserVehicle)
  app.put(`${route}/user-vehicle/:id`, passport.authenticate('jwt', { session: false }), userVehicleMiddleware.validateUpdateUserVehicleId, UserVehicleController.updateUserVehicle)
  app.delete(`${route}/user-vehicle/:id`, passport.authenticate('jwt', { session: false }), userVehicleMiddleware.validateDeleteUserVehicleId, UserVehicleController.deleteUserVehicle)
}
