'use strict'

module.exports = function (sequelize, DataTypes) {
  let Modules = sequelize.define('Modules',
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
    }
  )
  return Modules
}
