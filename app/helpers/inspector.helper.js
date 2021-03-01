var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

const createInspector = (userData) => {
  return db.User.findOne({
    where: { [Op.or]: [{ email: userData.email }] }
  })
    .then((user) => {
      if (user) {
        return generalHelpingMethods.rejectPromise({
          field: 'email',
          error: 3456,
          message: 'Email already exist.'
        })
      }

      return db.User.create(userData)
    })
    .then((user) => {
      return db.Inspector.create({ UserId: user.id })
    })
}

const updateInspector = (id, data) => {
  return db.Inspector.findOne({ where: { id } })
    .then((foundInspector) => {
      if (!foundInspector) {
        return generalHelpingMethods.rejectPromise({
          field: 'id',
          error: 3456,
          message: 'No Record Exists.'
        })
      }

      return db.User.update(data, {
        where: {
          id: foundInspector.UserId
        }
      })
    })
}

function deleteInspector (id) {
  return db.User.update({ isDeleted: true }, {
    where: {
      id
    }
  })
}

function getInspector (id) {
  return db.Inspector.findAll({
    // where: {
    //   id
    // },
    include: [{
      model: db.User,
      as: 'userInspector',
      attributes: ['fName', 'lName', 'email', 'isVerified', 'isActive', 'isBlocked', 'isDeleted', 'createdAt', 'updatedAt', 'roleId'],
      where: { isDeleted: false }
    }]
  })
}

module.exports = { createInspector, updateInspector, deleteInspector, getInspector }
