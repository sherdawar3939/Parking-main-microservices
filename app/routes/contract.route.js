'use strict'
const contractController = require('../controllers/contract.controller')
const { validateCreateContract, validateGetContractList, validateVerifyContract } = require('../middlewares/contract.middleware')

module.exports = function(app, apiVersion) {
    const route = apiVersion
    app.post(`${route}/add/contract`, validateCreateContract, contractController.addContract)
    app.get(`${route}/getContract`, validateGetContractList, contractController.getContractList)
    app.post(`${route}/contract-verify`, validateVerifyContract, contractController.verificationOfContract)

}