'use strict'

module.exports = function (sequelize, DataTypes) {
  let City = sequelize.define('City',
    {
      name: {
        type: DataTypes.STRING(50)
      },
      CountryId: {
        type: DataTypes.INTEGER(11)
      }
    }, {
      associate: function (models) {
        City.hasMany(models.ZipCode, { foreignKey: 'CityId', as: 'cityZipCodes' })
      }
    }
  )
  return City
}
