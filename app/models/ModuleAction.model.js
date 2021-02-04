'use strict'

module.exports = function (sequelize, DataTypes) {
  let ModuleAction = sequelize.define('ModuleAction',
    {
      ModuleId: {
        type: DataTypes.INTEGER(20)
      },
      ActionId: {
        type: DataTypes.INTEGER(20)
      }
    }, {
      associate: function (models) {
        ModuleAction.hasMany(models.Permission, { foreignKey: 'ModuleActionId', as: 'moduleActionPermission' })
      }
    }
  )
  return ModuleAction
}
