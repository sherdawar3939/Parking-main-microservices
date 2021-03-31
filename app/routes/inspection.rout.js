'use strict'
const { getInspection, createInspection } = require('../controllers/inspection.controller')
const { validateGetInspection, validatePostInspection } = require('../middlewares/inspection.middleware')
const passport = require('./../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/inspection', passport.authenticate('jwt', { session: false }), validateGetInspection, getInspection)
  app.post(route + '/inspection', passport.authenticate('jwt', { session: false }), validatePostInspection, createInspection)
}
