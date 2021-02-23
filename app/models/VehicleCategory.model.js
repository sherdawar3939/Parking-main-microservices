'use strict'

module.exports = function (sequelize, DataTypes) {
  let VehicleCategory = sequelize.define('VehicleCategory', {
    name: {
      type: DataTypes.STRING(20)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      VehicleCategory.hasMany(models.UserVehicle, { foreignKey: 'VehicleCategoryId', as: 'userVehicle' })
    }
  })
  return VehicleCategory
}
