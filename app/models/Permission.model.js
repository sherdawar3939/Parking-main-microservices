'use strict'

module.exports = function (sequelize, DataTypes) {
  let Permission = sequelize.define('Permission',
    {
      ModuleActionId: {
        type: DataTypes.INTEGER(20)
      },
      RoleId: {
        type: DataTypes.INTEGER(20)
      }
    }
  )
  return Permission
}
