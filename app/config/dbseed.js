'use strict'
// const Sequelize = require('sequelize')
// const Op = Sequelize.Op

module.exports = async function dbseed (db, sequelize) {
  const roles = [{
    id: 1,
    name: 'Super Admin',
    description: '',
    isActive: true,
    isDeleted: false,
    isDeleteAble: false
  }, {
    id: 2,
    name: 'Parking Admin',
    description: '',
    isActive: true,
    isDeleted: false,
    isDeleteAble: false
  }, {
    id: 3,
    name: 'User',
    description: '',
    isActive: true,
    isDeleted: false,
    isDeleteAble: false
  }, {
    id: 4,
    name: 'Inspector',
    description: '',
    isActive: true,
    isDeleted: false,
    isDeleteAble: false
  }
  ]

  await db.Role.bulkCreate(roles)
  // New Users
  let newUser = db.User.build({
    fName: 'Super',
    lName: 'Admin',
    email: 'admin@admin.com',
    RoleId: 1,
    isVerified: true
  })
  newUser.salt = newUser.makeSalt()
  newUser.hashedPassword = newUser.encryptPassword('newPassword', newUser.salt)
  newUser.save()
}
