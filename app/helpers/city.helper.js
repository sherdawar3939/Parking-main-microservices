'use strict'
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op
const db = require('../config/sequelize.config')
// const _ = require('lodash');

// **************************
// Get Cities
// **********************//

function getCity (conditions) {
  return db.City.findAll({
    where: conditions
  })
}
module.exports = {
  getCity
}
