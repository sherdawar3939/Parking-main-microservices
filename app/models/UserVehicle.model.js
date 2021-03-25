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
    }
  }, {
    associate: function (models) {
      UserVehicle.hasMany(models.Parking, { foreignKey: 'UserVehicleId', as: 'UserVehicleParking' })
      UserVehicle.hasMany(models.UserVoucher, { foreignKey: 'UserVehicleId', as: 'UserVehicleVouchers' })
      UserVehicle.belongsTo(models.User, { foreignKey: 'UserId', as: 'userVehicle' })
      UserVehicle.belongsTo(models.VehicleCategory, { foreignKey: 'VehicleCategoryId', as: 'userVehicleCategory' })
    }
  })
  return UserVehicle
}
