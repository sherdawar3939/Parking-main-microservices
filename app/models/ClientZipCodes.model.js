'use strict'

module.exports = function (sequelize, DataTypes) {
  let ClientZipCodes = sequelize.define('ClientZipCodes',
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
    }
  )
  return ClientZipCodes
}
