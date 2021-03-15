'use strict'

module.exports = function (sequelize, DataTypes) {
  let CreativeRequest = sequelize.define('CreativeRequest', {
    uid: {
      type: DataTypes.STRING(20)
    },
    qty: {
      type: DataTypes.INTEGER(11)
    },
    status: {
      type: DataTypes.ENUM(['Pending', 'InProcess', 'Dispatched', 'Canceled']),
      allowNull: false,
      defaultValue: 'Pending',
      field: 'status'
    }
    // UpdatedBy: {
    //   type: DataTypes.INTEGER(11)
    // }
  }, {
    associate: function (models) {
      CreativeRequest.belongsTo(models.ParkingZone, { foreignKey: 'ParkingZoneId', as: 'creativeParkingZone' })
    }
  })
  return CreativeRequest
}
