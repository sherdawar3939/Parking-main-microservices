'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')
const _ = require('lodash');

// **********************
// Add Laptop 
// **********************
function addLaptop(data) {
  return db.Laptop.findOne({
    where: { name: data.name },
    attributes: ['id', 'name', 'description', 'price']
  })
    .then((response) => {
      if (response) {
        return generalHelpingMethods.rejectPromise([{
          field: 'name',
          error: 1575,
          message: 'Laptop Name Already Exist'
        }])
      }
      return db.Laptop.create(data)
    })
}

// **********************
// GET Laptop List
// **********************
function getLaptops(conditions) {
  // Check if Unit exist in conditions
  return db.Laptop.findAll({
    where: conditions
  })
}

// ************************
// Delete Laptop
// ************************
const deleteLaptop = (input) => {
  return db.Laptop.findOne({
    where: {
      id: input.id,
    },
    attributes: ['id']
  })
    .then((result) => {
      if (_.isEmpty(result)) {
        // Employee not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      //delete
      result.delete() 
      // result.save()
      return true
    })
}

// ****************************
// Update Laptop 
// ****************************
function updateLaptop (data, id) {
  return db.Laptop.findOne({
    where: {
      id: id.id
    }
  })
  .then(laptop => {
      // console.log(data)
      if (_.isEmpty(laptop)) {
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      laptop.set(data)
      return laptop.save()
    })
}

module.exports = {
  getLaptops,
  addLaptop,
  deleteLaptop,
  updateLaptop
}
