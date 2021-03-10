const { adminDashboardDetail, clientDashboardDetails, clientRevenueDetails, dashboardParkingCounts, profitReportListing } = require('../controllers/dashboard.controller')
const { validateGetClientsRevenue, validateGetParkingCounts, validateGetReportListing } = require('../middlewares/dashboard.middleware')
const passport = require('./../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/dashboard', passport.authenticate('jwt', { session: false }), adminDashboardDetail)
  app.get(route + '/dashboard/:ClientId', passport.authenticate('jwt', { session: false }), clientDashboardDetails)
  app.get(route + '/dashboard/graph-revenue/:userType/:type', passport.authenticate('jwt', { session: false }), validateGetClientsRevenue, clientRevenueDetails)
  app.get(route + '/dashboard-parking-counts', passport.authenticate('jwt', { session: false }), validateGetParkingCounts, dashboardParkingCounts)
  app.get(route + '/dashboard-finance-report', passport.authenticate('jwt', { session: false }), validateGetReportListing, profitReportListing)

  // type = profit/revenue
}
