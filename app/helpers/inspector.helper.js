var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

const createInspector = async (userData, inspectorData) => {
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
      inspectorData.UserId = user.id
      return db.Inspector.create({ inspectorData })
    })
}

function updateInspector (id, data) {
  return db.User.update(data, {
    where: {
      id
    }
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
    where: {
      id
    },
    include: [{
      model: db.User,
      as: 'userInspector',
      where: { isDeleted: false }
    }]
  })
}

module.exports = { createInspector, updateInspector, deleteInspector, getInspector }
