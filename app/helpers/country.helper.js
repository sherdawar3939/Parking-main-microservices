'use strict'
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op
const db = require('../config/sequelize.config')
// const _ = require('lodash');

// **************************
// Get country
// **********************//

function getCountry (conditions) {
  return db.Country.findAll({
    where: conditions
  })
}
module.exports = {
  getCountry
}
