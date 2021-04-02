var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

const createInspector = (userData, ClientId) => {
  let userObj = {
    fName: userData.fName,
    lName: userData.lName,
    email: userData.email,
    RoleId: userData.RoleId
  }
  return db.User.findOne({
    where: {
      [Op.or]: [{ email: userData.email }]
    }
  })
    .then(async (user) => {
      if (user) {
        return generalHelpingMethods.rejectPromise({
          field: 'email',
          error: 'HCIT-0001',
          message: 'Email already exist.'
        })
      }
      let newUser = db.User.build(userObj)
      newUser.salt = newUser.makeSalt()
      newUser.hashedPassword = newUser.encryptPassword(userData.password, newUser.salt)
      await newUser.save()
      return newUser
    })
    .then((user) => {
      return db.Inspector.create({ UserId: user.id, ClientId })
    })
}

const updateInspector = (id, data) => {
  return db.Inspector.findOne({ where: { id } })

    .then(async (foundInspector) => {
      if (!foundInspector) {
        return generalHelpingMethods.rejectPromise({
          field: 'id',
          error: 'HUIT-0002',
          message: 'No Record Exists.'
        })
      }

      const newUser = await db.User.findOne({
        where: {
          id: foundInspector.UserId
        }
      })
      newUser.set(data)
      await newUser.save()
      if (data.password) {
        newUser.salt = newUser.makeSalt()
        newUser.hashedPassword = newUser.encryptPassword(data.password, newUser.salt)
        await newUser.save()
        return newUser
      }
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
