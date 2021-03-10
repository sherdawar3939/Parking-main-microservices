'use strict'
const { validatePostInspector, validateUpdateInspector, validateInspectorUser, validateGetInspectorUser, validateInspectorsList } = require('../middlewares/inspector.middleware')
const { addinspector, updateInspectorById, deleteInspectorUser, getInspectorUser, getInspectorsList } = require('../controllers/inspector.controller')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  // get categories of vehicle
  app.post(route + '/inspector', passport.authenticate('jwt', { session: false }), validatePostInspector, addinspector)
  app.get(route + '/inspector', passport.authenticate('jwt', { session: false }), validateInspectorsList, getInspectorsList)
  app.get(route + '/inspector/:id', passport.authenticate('jwt', { session: false }), validateGetInspectorUser, getInspectorUser)
  app.put(route + '/inspector/:id', passport.authenticate('jwt', { session: false }), validateUpdateInspector, updateInspectorById)
  app.delete(route + '/inspector/:id', passport.authenticate('jwt', { session: false }), validateInspectorUser, deleteInspectorUser)
}
