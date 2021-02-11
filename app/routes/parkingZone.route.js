'use strict'
const parkingZoneMiddleware = require('../middlewares/parkingZone.middleware')
const ParkingZoneController = require('../controllers/parkingZone.controller')
const generalMiddleware = require('../middlewares/general.middleware')

const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
    const route = apiVersion
    console.log(apiVersion)
  // get user vehicle
  app.get(`${route}/parking-zone`, parkingZoneMiddleware.validateGetparkingZone, ParkingZoneController.getParkingZone)
//   app.post(`${route}/user-vehicle`, userVehicleMiddleware.validatePostUserVehicle, UserVehicleController.addUserVehicle)
//   app.put(`${route}/user-vehicle/:id`, userVehicleMiddleware.validateUpdateUserVehicleId, UserVehicleController.updateUserVehicle)
//   app.delete(`${route}/user-vehicle/:id`, userVehicleMiddleware.validateDeleteUservehicleId, UserVehicleController.deleteUserVehicle)
}
