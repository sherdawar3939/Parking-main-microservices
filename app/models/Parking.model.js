'use strict'

module.exports = function(sequelize, DataTypes) {
    let Parking = sequelize.define('Parking', {
        totalSeconds: {
            type: DataTypes.DECIMAL(9, 5)
        },
        licensePlate: {
            type: DataTypes.STRING(20)
        },
        quantity: {
            type: DataTypes.INTEGER(2)
        },
        status: {
            type: DataTypes.STRING(20)
        },
        parkingCharges: {
            type: DataTypes.DECIMAL(9, 5)
        },
        profit: {
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
            type: DataTypes.STRING(20)
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
        associate: function(models) {
            Parking.belongsTo(models.ParkingZone, { foreignKey: 'ParkingZoneId', as: 'parkingZone' })
            Parking.belongsTo(models.User, { foreignKey: 'UserId', as: 'userParking' })
            Parking.belongsTo(models.UserVehicle, { foreignKey: 'UserVehicleId', as: 'parkingUserVehicle' })
        }
    })
    return Parking
}