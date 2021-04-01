var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

const createInspector = (userData, ClientId) => {
  return db.User.findOne({
    where: {
      [Op.or]: [{ email: userData.email }]
    }
  })
    .then((user) => {
      if (user) {
        return generalHelpingMethods.rejectPromise({
          field: 'email',
          error: 'HCIT-0001',
          message: 'Email already exist.'
        })
      }
      return db.User.create(userData)
    })
    .then((user) => {
      return db.Inspector.create({ UserId: user.id, ClientId })
    })
}

const updateInspector = (id, data) => {
  return db.Inspector.findOne({ where: { id } })
    .then((foundInspector) => {
      if (!foundInspector) {
        return generalHelpingMethods.rejectPromise({
          field: 'id',
          error: 'HUIT-0002',
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
  return db.Inspector.findOne({ where: { id } })
    .then((foundInspector) => {
      if (!foundInspector) {
        return generalHelpingMethods.rejectPromise({
          field: 'id',
          error: 'HDIT-0003',
          message: 'No Record Exists.'
        })
      }

      return db.User.update({ isDeleted: true }, {
        where: {
          id: foundInspector.UserId
        }
      })
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
      attributes: ['fName', 'lName', 'email', 'isVerified', 'isBlocked', 'isDeleted', 'createdAt', 'updatedAt', 'roleId'],
      where: { isDeleted: false }
    }]
  })
}

function getInspectorList (conditions, limit, offset) {
  const userwhere = { isDeleted: false }
  const InspectorWhere = {}
  if (conditions.search) {
    userwhere[Op.or] = {
      fName: {
        [Op.like]: '%' + conditions.search + '%'
      },
      lName: {
        [Op.like]: '%' + conditions.search + '%'
      },
      email: {
        [Op.like]: '%' + conditions.search + '%'
      }
    }
  }
  if (conditions.ClientId) {
    InspectorWhere.ClientId = conditions.ClientId
  }
  return db.Inspector.findAll({
    where: InspectorWhere,
    limit: limit,
    offset: offset,
    include: [{
      model: db.User,
      as: 'userInspector',
      attributes: ['fName', 'lName', 'email', 'isVerified', 'isBlocked', 'isDeleted', 'createdAt', 'updatedAt', 'roleId'],
      where: userwhere
    }]
  })
}
module.exports = { createInspector, updateInspector, deleteInspector, getInspector, getInspectorList }
