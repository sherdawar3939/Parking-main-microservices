const { adminDashboardDetail, clientDashboardDetails, clientRevenueDetails, dashboardParkingCounts } = require('../controllers/dashboard.controller')
const { validateGetClientsRevenue, validateGetParkingCounts } = require('../middlewares/dashboard.middleware')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/dashboard', adminDashboardDetail)
  app.get(route + '/dashboard/:ClientId', clientDashboardDetails)
  app.get(route + '/dashboard/graph-revenue/:userType/:type', validateGetClientsRevenue, clientRevenueDetails)
  app.get(route + '/dashboard/parking/counts', validateGetParkingCounts, dashboardParkingCounts)

  // type = profit/revenue
}
