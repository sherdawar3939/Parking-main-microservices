const { adminDashboardDetail, clientDashboardDetails, clientRevenueDetails, dashboardParkingCounts, profitReportListing } = require('../controllers/dashboard.controller')
const { validateGetClientsRevenue, validateGetParkingCounts, validateGetReportListing } = require('../middlewares/dashboard.middleware')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/dashboard', adminDashboardDetail)
  app.get(route + '/dashboard/:ClientId', clientDashboardDetails)
  app.get(route + '/dashboard/graph-revenue/:userType/:type', validateGetClientsRevenue, clientRevenueDetails)
  app.get(route + '/dashboard-parking-counts', validateGetParkingCounts, dashboardParkingCounts)
  app.get(route + '/dashboard-finance-report', validateGetReportListing, profitReportListing)

  // type = profit/revenue
}
