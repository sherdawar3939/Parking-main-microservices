'use strict'

module.exports = function (sequelize, DataTypes) {
  let ClientZipCode = sequelize.define('ClientZipCode',
    {
      ZipCodeId: {
        type: DataTypes.INTEGER(11)
      },
      ClientId: {
        type: DataTypes.INTEGER(11)
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      associate: function (models) {
        ClientZipCode.hasMany(models.ParkingZone, { foreignKey: 'ParkingZoneId', as: 'clientParkingZone' })
      }
    }
  )
  return ClientZipCode
}
