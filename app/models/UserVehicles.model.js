'use strict'

module.exports = function (sequelize, DataTypes) {
  let UserVehicles = sequelize.define('UserVehicles',
    {
      licensePlate: {
        type: DataTypes.STRING(20)
      },
      quantity: {
        type: DataTypes.INTEGER(2)
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      VehicleId: {
        type: DataTypes.INTEGER(11)
      },
      UserId: {
        type: DataTypes.INTEGER(11)
      }
    }
  )
  return UserVehicles
}
