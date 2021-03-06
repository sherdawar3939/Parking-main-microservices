const { adminDashboardDetail, clientDashboardDetails, clientRevenueDetails } = require('../controllers/dashboard.controller')
const { validateGetClientsRevenue } = require('../middlewares/dashboard.middleware')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/dashboard', adminDashboardDetail)
  app.get(route + '/dashboard/:ClientId', clientDashboardDetails)
  app.get(route + '/dashboard/graph-revenue/:userType/:type', validateGetClientsRevenue, clientRevenueDetails)
  // app.get(route + '/dashboard/graph-revenue/:userType/:type', validateGetClientsRevenue, clientRevenueDetails)

  // type = profit/revenue
}
