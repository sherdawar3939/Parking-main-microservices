'use strict'

module.exports = function (sequelize, DataTypes) {
  let ParkingZone = sequelize.define('ParkingZone', {
    uid: {
      type: DataTypes.STRING(20)
    },
    days: {
      type: DataTypes.STRING(245)
    },
    fee: {
      type: DataTypes.DECIMAL(8, 4)
    },
    maxTime: {
      type: DataTypes.STRING(6)
    },
    zip: {
      type: DataTypes.STRING(6)
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
    lat: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lng: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Active', 'InActive'),
      allowNull: false,
      defaultValue: 'InActive'
    },
    activeAfter: {
      type: DataTypes.DATE
    },
    contractUrl: {
      type: DataTypes.STRING
    },
    clientCount: {
      type: DataTypes.INTEGER(3)
    }
  }, {
    associate: function (models) {
      ParkingZone.belongsTo(models.Client, { foreignKey: 'ClientId', as: 'parkingZoneClient' })
      ParkingZone.hasMany(models.Parking, { foreignKey: 'ParkingZoneId', as: 'parkingZoneParkings' })
      ParkingZone.hasMany(models.Inspection, { foreignKey: 'ParkingZoneId', as: 'parkingZoneInspections' })
      ParkingZone.hasMany(models.CreativeRequest, { foreignKey: 'ParkingZoneId', as: 'parkingCreatives' })
      ParkingZone.belongsTo(models.City, { foreignKey: 'CityId', as: 'cityParkingZone' })
      ParkingZone.hasMany(models.ParkingZoneHoliday, { foreignKey: 'ParkingZoneId', as: 'parkingHolidays' })
    }
  })
  return ParkingZone
}
