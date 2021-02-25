'use strict'
const contractController = require('../controllers/contract.controller')
const { validateCreateContract, validateGetContractList, validateVerifyContract, validateGetContractByClientId, validateGetContract } = require('../middlewares/contract.middleware')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  app.post(`${route}/contract`, validateCreateContract, contractController.addContract)
  app.get(`${route}/contract`, validateGetContractList, contractController.getContractList)
  app.get(`${route}/contract/by/:id`, validateGetContract, contractController.getContract)
  app.get(`${route}/contract/:id`, validateGetContractByClientId, contractController.getContractByClientid)
  app.post(`${route}/contract/verify/:id`, validateVerifyContract, contractController.verificationOfContract)
}
