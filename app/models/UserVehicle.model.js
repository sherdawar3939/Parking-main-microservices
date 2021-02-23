'use strict'

module.exports = function (sequelize, DataTypes) {
  let UserVehicle = sequelize.define('UserVehicle', {
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
    VehicleCategoryId: {
      type: DataTypes.INTEGER(11)
    },
    UserId: {
      type: DataTypes.INTEGER(11)
    }
  }, {
    associate: function (models) {
      UserVehicle.hasMany(models.Parking, { foreignKey: 'UserVehicleId', as: 'UserVehicleParking' })
    }
  })
  return UserVehicle
}
