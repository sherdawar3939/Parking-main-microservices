const { adminDashboardDetail, clientDashboardDetails } = require('../controllers/dashboard.controller')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/dashboard', passport.authenticate('jwt', { session: false }), adminDashboardDetail)
  app.get(route + '/dashboard/:ClientId', passport.authenticate('jwt', { session: false }), clientDashboardDetails)
}
