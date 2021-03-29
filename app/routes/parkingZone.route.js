'use strict'
const parkingZoneMiddleware = require('../middlewares/parkingZone.middleware')
const ParkingZoneController = require('../controllers/parkingZone.controller')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion
  // get parking zones
  app.post(`${route}/parking-zone`, passport.authenticate('jwt', { session: false }), parkingZoneMiddleware.validateCreateParkingZone, ParkingZoneController.addParkingZone)
  app.get(`${route}/parking-zone`, passport.authenticate('jwt', { session: false }), parkingZoneMiddleware.validateGetParkingZone, ParkingZoneController.getParkingZone)
  app.get(`${route}/parking-zone/:id`, passport.authenticate('jwt', { session: false }), parkingZoneMiddleware.validateGetParkingZoneId, ParkingZoneController.getParkingZoneById)
  app.put(`${route}/parking-zone/:id`, passport.authenticate('jwt', { session: false }), parkingZoneMiddleware.validateUpdateParkingZone, ParkingZoneController.updateParkingZone)
  app.delete(`${route}/parking-zone/:id`, passport.authenticate('jwt', { session: false }), parkingZoneMiddleware.validateGetParkingZoneId, ParkingZoneController.deleteParkingZone)
}
