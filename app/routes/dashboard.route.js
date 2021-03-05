const { adminDashboardDetail, clientDashboardDetails, clientRevenueDetails } = require('../controllers/dashboard.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/dashboard', adminDashboardDetail)
  app.get(route + '/dashboard/:ClientId', clientDashboardDetails)
  app.get(route + '/Client-Revenue', clientRevenueDetails)
}
