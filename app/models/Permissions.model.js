'use strict'

module.exports = function (sequelize, DataTypes) {
  let Permissions = sequelize.define('Permissions',
    {
      ModuleActionId: {
        type: DataTypes.INTEGER(20)
      },
      RoleId: {
        type: DataTypes.INTEGER(20)
      }
    }
  )
  return Permissions
}
