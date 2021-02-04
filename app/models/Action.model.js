'use strict'

module.exports = function (sequelize, DataTypes) {
  let Action = sequelize.define('Action',
    {
      name: {
        type: DataTypes.INTEGER(20)
      },
      identifier: {
        type: DataTypes.INTEGER(20)
      }
    }, {
      associate: function (models) {
        Action.hasMany(models.ModuleAction, { foreignKey: 'ActionId', as: 'ModuleActions' })
      }
    }
  )
  return Action
}
