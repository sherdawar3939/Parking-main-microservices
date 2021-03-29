'use strict'

module.exports = function (sequelize, DataTypes) {
  let Inspection = sequelize.define('Inspection', {
    InspectorId: {
      type: DataTypes.INTEGER(11)
    },
    ParkingId: {
      type: DataTypes.INTEGER(11)
    },
    ParkingZoneId: {
      type: DataTypes.INTEGER(11)
    },
    licensePlate: {
      type: DataTypes.STRING(20)
    },
    result: {
      type: DataTypes.ENUM(['legal', 'illegal']),
      defaultValue: 'illegal'
    },
    lat: {
      type: DataTypes.STRING(20)
    },
    lng: {
      type: DataTypes.STRING(20)
    }
  }, {
    associate: function (models) {
      Inspection.belongsTo(models.Inspector, { foreignKey: 'InspectorId', as: 'inspector' })
      Inspection.belongsTo(models.Parking, { foreignKey: 'ParkingId', as: 'parkingInspections' })
      Inspection.belongsTo(models.ParkingZone, { foreignKey: 'ParkingZoneId', as: 'inspectedParkingZone' })
    }
  })
  return Inspection
}
