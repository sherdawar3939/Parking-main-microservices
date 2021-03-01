'use strict'
const { validatePostInspector, validateUpdateInspector } = require('../middlewares/inspector.middleware')
const { addinspector, updateInspectorById } = require('../controllers/inspector.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // get categories of vehicle
  app.post(route + '/inspector', validatePostInspector, addinspector)
  app.put(route + '/inspector/:id', validateUpdateInspector, updateInspectorById)
}
