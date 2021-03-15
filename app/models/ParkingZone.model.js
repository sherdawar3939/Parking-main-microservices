'use strict'

module.exports = function (sequelize, DataTypes) {
  let ParkingZone = sequelize.define('ParkingZone', {
    uid: {
      type: DataTypes.STRING(20)
    },
    days: {
      type: DataTypes.STRING(50)
    },
    fee: {
      type: DataTypes.DECIMAL(8, 4)
    },
    maxTime: {
      type: DataTypes.STRING(115)
    },
    holidays: {
      type: DataTypes.TEXT(50)
    },
    zip: {
      type: DataTypes.STRING(115)
    },
    startTime: {
      type: DataTypes.TIME
    },
    endTime: {
      type: DataTypes.TIME
    },
    polygons: {
      type: DataTypes.TEXT
    },
    status: {
      type: DataTypes.ENUM('Active', 'InActive'),
      allowNull: false,
      defaultValue: 'InActive'
    },
    activeAfter: {
      type: DataTypes.DATE
    }
  }, {
    associate: function (models) {
      ParkingZone.belongsTo(models.Client, { foreignKey: 'ClientId', as: 'parkingZoneClient' })
      ParkingZone.hasMany(models.Parking, { foreignKey: 'ParkingZoneId', as: 'parkingZoneParkings' })
      ParkingZone.hasMany(models.CreativeRequest, { foreignKey: 'ParkingZoneId', as: 'parkingCreatives' })
      ParkingZone.belongsTo(models.City, { foreignKey: 'CityId', as: 'cityParkingZone' })
      ParkingZone.hasMany(models.ParkingZoneHolidays, { foreignKey: 'ParkingZoneId', as: 'parkingHoliday' })
    }
  })
  return ParkingZone
}
