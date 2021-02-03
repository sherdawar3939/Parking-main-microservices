'use strict'

module.exports = function (sequelize, DataTypes) {
  let Actions = sequelize.define('Actions',
    {
      name: {
        type: DataTypes.INTEGER(20)
      },
      identifier: {
        type: DataTypes.INTEGER(20)
      },
    }
  )
  return Actions
}
