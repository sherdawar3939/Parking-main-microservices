'use strict'
const { validatePostInspector } = require('../middlewares/inspector.middleware')
const { addinspector } = require('../controllers/inspector.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // get categories of vehicle
  app.post(route + '/inspector', validatePostInspector, addinspector)
}
