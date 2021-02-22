'use strict'
const contractController = require('../controllers/contract.controller')
const contractMiddleware = require('../middlewares/contract.middleware')

module.exports = function (app, apiVersion) {
    const route = apiVersion
    app.post(`${route}/contract`, contractMiddleware.validateGetContractList, contractController.addContract)
    app.get(`${route}/contract`, contractMiddleware.validateGetContractList, contractController.getContractList)
    app.post(`${route}/contract-verify`, contractMiddleware.validateVerifyContract, contractController.verificationOfContract)

}
