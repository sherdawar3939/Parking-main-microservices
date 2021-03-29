'use strict'
const getActiveParkingStatus = require('../controllers/inspection.controller')
const validateGetParkingStatus = require('../middlewares/inspection.middleware')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/inspection', validateGetParkingStatus, getActiveParkingStatus)
}
