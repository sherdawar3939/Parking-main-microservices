'use strict'

module.exports = function (sequelize, DataTypes) {
  let ParkingZones = sequelize.define('ParkingZones',
    {
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
      },
      creatives: {
        type: DataTypes.INTEGER(5)
      },
      ClientZipCodeId: {
        type: DataTypes.INTEGER(11)
      }
    }
  )
  return ParkingZones
}
