'use strict'
const { validateCreateParking, validateGetParkingList, validateEndParking } = require('../middlewares/parking.middleware')
const { createParking, getActiveParkingList, endParking } = require('../controllers/parking.controller')

module.exports = function(app, apiVersion) {
    const route = apiVersion

    app.post(route + '/parking-start', validateCreateParking, createParking)
    app.post(route + '/parking/end', validateEndParking, endParking)
    app.get(route + '/parking', validateGetParkingList, getActiveParkingList)
}