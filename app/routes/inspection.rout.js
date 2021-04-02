'use strict'
const { getInspection, createInspection, getTodayInspectionCount } = require('../controllers/inspection.controller')
const { validateGetInspection, validatePostInspection, validateGetTodayInspectionCount } = require('../middlewares/inspection.middleware')
const passport = require('./../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/inspection', passport.authenticate('jwt', { session: false }), validateGetInspection, getInspection)
  app.get(route + '/inspection/today-count', passport.authenticate('jwt', { session: false }), validateGetTodayInspectionCount, getTodayInspectionCount)
  app.post(route + '/inspection', passport.authenticate('jwt', { session: false }), validatePostInspection, createInspection)
}
