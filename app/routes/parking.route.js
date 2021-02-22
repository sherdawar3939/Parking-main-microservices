'use strict'
const { validateCreateParking, validateGetParkingList } = require('../middlewares/parking.middleware')
const { createParking, getActiveParkingList } = require('../controllers/parking.controller')

module.exports = function (app, apiVersion) {
    const route = apiVersion

    // get categories of vehicle
    app.post(route + '/parking', validateCreateParking, createParking)
    app.get(route + '/parking', validateGetParkingList, getActiveParkingList)

}
