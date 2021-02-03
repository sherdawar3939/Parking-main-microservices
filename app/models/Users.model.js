'use strict'

module.exports = function (sequelize, DataTypes) {
  let Users = sequelize.define('Users',
    {
      fName: {
        type: DataTypes.STRING(50)
      },
      lName: {
        type: DataTypes.STRING(50)
      },
      email: {
        type: DataTypes.STRING(50)
      },
      otp: {
        type: DataTypes.STRING(5)
      },
      balance: {
        type: DataTypes.DECIMAL(11, 4)
      },
      validTill: {
        type: DataTypes.DATE
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      RoleId: {
        type: DataTypes.INTEGER(11)
      }
    }
  )
  return Users
}
