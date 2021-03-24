'use strict'

module.exports = function (sequelize, DataTypes) {
  let Parking = sequelize.define('Parking', {
    totalSeconds: {
      type: DataTypes.DECIMAL(9, 5)
    },
    licensePlate: {
      type: DataTypes.STRING(20)
    },
    status: {
      type: DataTypes.ENUM(['Started', 'Ended']),
      allowNull: false,
      defaultValue: 'Started'
    },
    parkingCharges: {
      type: DataTypes.DECIMAL(9, 5)
    },
    quantity: {
      type: DataTypes.INTEGER(2)
    },
    clientProfit: {
      type: DataTypes.DECIMAL(9, 5)
    },
    clientTax: {
      type: DataTypes.DECIMAL(9, 5)
    },
    adminProfit: {
      type: DataTypes.DECIMAL(9, 5)
    },
    adminTax: {
      type: DataTypes.DECIMAL(9, 5)
    },
    total: {
      type: DataTypes.DECIMAL(9, 5)
    },
    paymentId: {
      type: DataTypes.STRING(50)
    },
    PayerID: {
      type: DataTypes.STRING(50)
    },
    startedOn: {
      type: DataTypes.DATE
    },
    endedOn: {
      type: DataTypes.DATE
    },
    paymentStatus: {
      type: DataTypes.ENUM(['Pending', 'Paid']),
      allowNull: false,
      defaultValue: 'Pending'
    },
    ParkingZoneId: {
      type: DataTypes.INTEGER(11)
    },
    UserId: {
      type: DataTypes.INTEGER(11)
    },
    UserVehicleId: {
      type: DataTypes.INTEGER(11)
    }
  }, {
    associate: function (models) {
      Parking.belongsTo(models.ParkingZone, { foreignKey: 'ParkingZoneId', as: 'parkingZone' })
      Parking.belongsTo(models.User, { foreignKey: 'UserId', as: 'userParking' })
      Parking.belongsTo(models.UserVehicle, { foreignKey: 'UserVehicleId', as: 'parkingUserVehicle' })
      Parking.hasMany(models.Inspection, { foreignKey: 'ParkingId', as: 'parkingInspections' })
    }
  })
  return Parking
}
