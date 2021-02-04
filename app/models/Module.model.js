'use strict'

module.exports = function (sequelize, DataTypes) {
  let Module = sequelize.define('Module',
    {
      name: {
        type: DataTypes.INTEGER(20)
      },
      identifier: {
        type: DataTypes.INTEGER(20)
      },
      description: {
        type: DataTypes.INTEGER(100)
      }
    }, {
      associate: function (models) {
        Module.hasMany(models.ModuleAction, { foreignKey: 'ModuleId', as: 'ModuleActions' })
      }
    }
  )
  return Module
}
