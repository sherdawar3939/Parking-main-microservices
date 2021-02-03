'use strict'

module.exports = function (sequelize, DataTypes) {
  let Vehicles = sequelize.define('Vehicles',
    {
      name: {
        type: DataTypes.STRING(20)
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }
  )
  return Vehicles
}
