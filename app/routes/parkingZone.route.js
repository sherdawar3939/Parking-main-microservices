'use strict'
const parkingZoneMiddleware = require('../middlewares/parkingZone.middleware')
const ParkingZoneController = require('../controllers/parkingZone.controller')
const generalMiddleware = require('../middlewares/general.middleware')

const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // get parking zones
  app.get(`${route}/parking-zone`, parkingZoneMiddleware.validateGetParkingZone, ParkingZoneController.getParkingZone)
  app.get(`${route}/parking-zone/:id`, parkingZoneMiddleware.validateGetParkingZoneId, ParkingZoneController.getParkingZoneById)
}
