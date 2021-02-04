'use strict'

module.exports = function (sequelize, DataTypes) {
  let Country = sequelize.define('Country',
    {
      name: {
        type: DataTypes.STRING(50)
      },
      iso: {
        type: DataTypes.STRING(5)
      }
    }, {
      associate: function (models) {
        Country.hasMany(models.City, { foreignKey: 'CountryId', as: 'countryCities' })
      }
    }
  )
  return Country
}
