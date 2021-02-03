'use strict'
const laptopMiddleware = require('../middlewares/laptop.middleware')
const laptopController = require('../controllers/laptop.controller')
const generalMiddleware = require('../middlewares/general.middleware')

const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To Post Banner
  app.post(route + '/laptop',   laptopMiddleware.validatePostLaptop, laptopController.addLaptop)
  // To Get Laptop
  app.get(route + '/laptop',  laptopMiddleware.validateGetLaptop, laptopController.getLaptops)
  // To Update Status
  app.put(route + '/laptop/:id',  laptopMiddleware.validateUpdateLaptop, laptopController.updateLaptop)
  // Delete Laptop
  app.delete(route + '/laptop/:id', laptopMiddleware.validateDeleteLaptop, laptopController.deleteLaptop)
}
