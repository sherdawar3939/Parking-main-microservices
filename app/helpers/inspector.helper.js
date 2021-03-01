var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

const createInspector = async (body) => {
  return db.User.findOne({
    where: { [Op.or]: [{ email: body.email }] }
  })
    .then((user) => {
      if (user) {
        return generalHelpingMethods.rejectPromise({
          field: 'email',
          error: 3456,
          message: 'Email already exist.'
        })
      }

      return db.User.create(body)
    })
    .then((user) => {
      return db.Inspector.create({ fName: user.fName, lName: user.lName, UserId: user.id })
    })
}

function updateInspector (id, data) {
  return db.Inspector.update(data, {
    where: {
      id
    }
  })
}

module.exports = { createInspector, updateInspector }
