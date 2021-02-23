'use strict'

module.exports = function (sequelize, DataTypes) {
  let ClientZipCode = sequelize.define('ClientZipCode', {
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
      ClientZipCode.belongsTo(models.ZipCode, { foreignKey: 'ZipCodeId', as: 'zipCodes' })
      ClientZipCode.belongsTo(models.Client, { foreignKey: 'ClientId' })
      ClientZipCode.hasMany(models.ParkingZone, { foreignKey: 'ClientZipCodeId', as: 'clientParkingZone' })
    }
  })
  return ClientZipCode
}
