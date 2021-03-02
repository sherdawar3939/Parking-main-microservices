'use strict'
const parkingZoneMiddleware = require('../middlewares/parkingZone.middleware')
const ParkingZoneController = require('../controllers/parkingZone.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // get parking zones
  app.post(`${route}/parking-zone`, parkingZoneMiddleware.validateCreateParkingZone, ParkingZoneController.addParkingZone)
  app.get(`${route}/parking-zone`, parkingZoneMiddleware.validateGetParkingZone, ParkingZoneController.getParkingZone)
  app.get(`${route}/parking-zone/:id`, parkingZoneMiddleware.validateGetParkingZoneId, ParkingZoneController.getParkingZoneById)
  app.put(`${route}/parking-zone/:id`, parkingZoneMiddleware.validateUpdateParkingZone, ParkingZoneController.updateParkingZone)
}
