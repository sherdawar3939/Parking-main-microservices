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
    zip: {
      type: DataTypes.STRING(115)
    },
    polygons: {
      type: DataTypes.TEXT
    }
  }, {
    associate: function (models) {
      ParkingZone.belongsTo(models.Client, { foreignKey: 'ClientId', as: 'parkingZoneClient' })
      ParkingZone.hasMany(models.Parking, { foreignKey: 'ParkingZoneId', as: 'parkingZoneParkings' })
      ParkingZone.hasMany(models.CreativeRequest, { foreignKey: 'ParkingZoneId', as: 'parkingCreatives' })
    }
  })
  return ParkingZone
}
