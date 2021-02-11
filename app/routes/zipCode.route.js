'use strict'
const zipCodeController = require('../controllers/zipCode.controller');
const zipCodeMiddleware = require('../middlewares/zipCode.middleware')

module.exports = function(app, apiVersion) {
    const route = apiVersion

    //**********************
    // get zipCode 
    //*********************/

    app.get(route + '/zipCode', zipCodeMiddleware.validateGetZipCode, zipCodeController.getZipCode)

}