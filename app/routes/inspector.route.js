'use strict'
const { validatePostInspector, validateUpdateInspector, validateInspectorUser, validateGetInspectorUser } = require('../middlewares/inspector.middleware')
const { addinspector, updateInspectorById, deleteInspectorUser, getInspectorUser } = require('../controllers/inspector.controller')

module.exports = function(app, apiVersion) {
    const route = apiVersion

    // get categories of vehicle
    app.post(route + '/inspector', validatePostInspector, addinspector)
    app.get(route + '/inspector/:id', validateGetInspectorUser, getInspectorUser)
    app.put(route + '/inspector/:id', validateUpdateInspector, updateInspectorById)
    app.delete(route + '/inspector/:id', validateInspectorUser, deleteInspectorUser)
}