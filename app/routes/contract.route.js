'use strict'
const contractController = require('../controllers/contract.controller')

const passport = require('../config/passport')
const { validateCreateContract, validateGetContractList, validateVerifyContract, validateGetContract, validateContractApproved } = require('../middlewares/contract.middleware')
module.exports = function (app, apiVersion) {
  const route = apiVersion
  app.post(`${route}/contract`, validateCreateContract, contractController.addContract)
  app.get(`${route}/contract`, validateGetContractList, contractController.getContractList)
  app.get(`${route}/contract/:id`, validateGetContract, contractController.getContract) // To get single contract by id / contract detail
  app.post(`${route}/contract/verify/:id`, validateVerifyContract, contractController.verificationOfContract)
  app.get(`${route}/contract/approved`, passport.authenticate('jwt', { session: false }), validateContractApproved, contractController.getApprovedContract)
}
