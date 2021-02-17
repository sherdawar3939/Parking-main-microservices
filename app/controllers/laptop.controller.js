'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const laptopHelper = require('../helpers/laptop.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************************
// Add Laptops
// ***********************************
const addLaptop = function (req, res) {
  return laptopHelper.addLaptop(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Laptop added successfully.', data, 'laptop.controller.addLaptop')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'laptop.controller.addLaptop', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'laptop.controller.addLaptop', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Get Laptops list
// ***********************************

const getLaptops = function (req, res) {
  return laptopHelper.getLaptops(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Laptops fetch successfully.', data, 'laptop.controller.getLaptops')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'laptop.controller.getLaptops', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'laptop.controller.getLaptops', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Delete Laptop
// ***********************************
const deleteLaptop = (req, res) => {
  return laptopHelper.deleteLaptop(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'Laptop deleted successfully', data, 'laptop.controller.deleteLaptop')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'laptop.controller.deleteLaptop', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'laptop.controller.deleteLaptop', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Update Laptop
// ***********************************
const updateLaptop = function (req, res) {
  // console.log("body",req);
  return laptopHelper.updateLaptop(req.body, req.params)
    .then((data) => {
      generalController.successResponse(res, 'Laptop Updated successfully.', data, 'laptop.controller.updateLaptop')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'laptop.controller.updateLaptop', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'laptop.controller.updateLaptop', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  addLaptop,
  getLaptops,
  deleteLaptop,
  updateLaptop
}
