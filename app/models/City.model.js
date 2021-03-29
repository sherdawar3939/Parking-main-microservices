'use strict'

module.exports = function (sequelize, DataTypes) {
  let City = sequelize.define('City',
    {
      name: {
        type: DataTypes.STRING(50)
      }
    }, {
      associate: function (models) {
        City.belongsTo(models.Country, { foreignKey: 'CountryId', as: 'cityCountry' })
        City.hasMany(models.ParkingZone, { foreignKey: 'CityId', as: 'cityParkingZone' })
      }
    }
  )
  return City
}
