'use strict'

module.exports = function (sequelize, DataTypes) {
  let ParkingZoneHoliday = sequelize.define('ParkingZoneHoliday',
    {
      holidayDate: {
        type: DataTypes.DATE
      }
    }, {
      associate: function (models) {
        ParkingZoneHoliday.belongsTo(models.ParkingZone, { foreignKey: 'ParkingZoneId', as: 'parkingHoliday' })
      }
    }
  )
  return ParkingZoneHoliday
}
