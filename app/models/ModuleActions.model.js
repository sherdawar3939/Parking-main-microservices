'use strict'

module.exports = function (sequelize, DataTypes) {
  let ModuleActions = sequelize.define('ModuleActions',
    {
      ModuleId: {
        type: DataTypes.INTEGER(20)
      },
      ActionId: {
        type: DataTypes.INTEGER(20)
      }
    }
  )
  return ModuleActions
}
