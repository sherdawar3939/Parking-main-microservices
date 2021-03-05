'use strict'
const contractController = require('../controllers/contract.controller')
const { validateCreateContract, validateGetContractList, validateVerifyContract, validateGetContract } = require('../middlewares/contract.middleware')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  app.post(`${route}/contract`, validateCreateContract, contractController.addContract)
  app.get(`${route}/contract`, validateGetContractList, contractController.getContractList)
  app.get(`${route}/contract/:id`, validateGetContract, contractController.getContract) // To get single contract by id / contract detail
  app.post(`${route}/contract/verify/:id`, validateVerifyContract, contractController.verificationOfContract)
}
