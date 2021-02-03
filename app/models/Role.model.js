'use strict'

module.exports = function (sequelize, DataTypes) {
  let Role = sequelize.define('Role',
    {
      Name: {
        type: DataTypes.STRING(20)
      },
      description: {
        type: DataTypes.STRING(100)
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isDeleteAble: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      RoleId: {
        type: DataTypes.INTEGER(11)
      }
    }
  )
  return Role
}
