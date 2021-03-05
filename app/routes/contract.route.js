'use strict'
const contractController = require('../controllers/contract.controller')
const { validateCreateContract, validateGetContractList, validateVerifyContract, validateGetContractByClientId, validateGetContract, validateContractApproved } = require('../middlewares/contract.middleware')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion
  app.post(`${route}/contract`, validateCreateContract, contractController.addContract)
  app.get(`${route}/contract`, validateGetContractList, contractController.getContractList)
  app.get(`${route}/contract/by/:id`, validateGetContract, contractController.getContract)
  app.get(`${route}/contract/:id`, validateGetContractByClientId, contractController.getContractByClientid)
  app.post(`${route}/contract/verify/:id`, validateVerifyContract, contractController.verificationOfContract)
  app.get(`${route}/contract-approved`, passport.authenticate('jwt', { session: false }), validateContractApproved, contractController.getApprovedContract)
}
