'use strict'

module.exports = function (sequelize, DataTypes) {
  let ParkingZoneHolidays = sequelize.define('City',
    {
      holidayDate: {
        type: DataTypes.DATE
      }
    }, {
      associate: function (models) {
        ParkingZoneHolidays.belongsTo(models.ParkingZone, { foreignKey: 'ParkingZoneId', as: 'parkingHoliday' })
      }
    }
  )
  return ParkingZoneHolidays
}
