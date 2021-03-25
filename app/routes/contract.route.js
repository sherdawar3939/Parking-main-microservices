'use strict'
const contractController = require('../controllers/contract.controller')

const passport = require('../config/passport')
const { validateCreateContract, validateGetContractList, validateVerifyContract, validateGetContract, validateContractApproved } = require('../middlewares/contract.middleware')
module.exports = function (app, apiVersion) {
  const route = apiVersion
  app.post(`${route}/contract`, passport.authenticate('jwt', { session: false }), validateCreateContract, contractController.addContract)
  app.get(`${route}/contract`, passport.authenticate('jwt', { session: false }), validateGetContractList, contractController.getContractList)
  app.get(`${route}/contract/verify/:id`, passport.authenticate('jwt', { session: false }), validateVerifyContract, contractController.verificationOfContract)
  app.get(`${route}/contract/is-approved`, passport.authenticate('jwt', { session: false }), validateContractApproved, contractController.getApprovedContract)
  app.get(`${route}/contract/:id`, passport.authenticate('jwt', { session: false }), validateGetContract, contractController.getContract) // To get single contract by id / contract detail
  app.post(`${route}/contract/upload/:id`, contractController.uploadFiles)
}

// uploadFile.single('file')
