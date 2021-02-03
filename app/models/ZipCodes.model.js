'use strict'

module.exports = function (sequelize, DataTypes) {
  let ZipCodes = sequelize.define('ZipCodes',
    {
      zipCode: {
        type: DataTypes.STRING(5)
      },
      CityId: {
        type: DataTypes.INTEGER(11)
      },
    }
  )
  return ZipCodes
}
