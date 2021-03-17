'use strict'

module.exports = function (sequelize, DataTypes) {
  let Country = sequelize.define('Country',
    {
      name: {
        type: DataTypes.STRING(50)
      },
      iso: {
        type: DataTypes.STRING(5)
      },
      tax: {
        type: DataTypes.DECIMAL(6, 3)
      }
    }, {
      associate: function (models) {
        Country.hasMany(models.City, { foreignKey: 'CountryId', as: 'countryCities' })
        Country.hasMany(models.Client, { foreignKey: 'CountryId', as: 'countryClient' })
      }
    }
  )
  return Country
}
