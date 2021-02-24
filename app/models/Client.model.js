'use strict'

module.exports = function (sequelize, DataTypes) {
  let Client = sequelize.define('Client',
    {
      companyName: {
        type: DataTypes.STRING(50)
      },
      email: {
        type: DataTypes.STRING(50)
      },
      phone: {
        type: DataTypes.STRING(20)
      },
      secondaryContactPersonName: {
        type: DataTypes.STRING(100)
      },
      secondaryEmail: {
        type: DataTypes.STRING(50)
      },
      secondaryPhone: {
        type: DataTypes.STRING(20)
      },
      address: {
        type: DataTypes.STRING(100)
      },
      iban: {
        type: DataTypes.STRING(50)
      },
      balance: {
        type: DataTypes.DECIMAL(11, 4)
      },
      UserId: {
        type: DataTypes.INTEGER(11)
      }
    }, {
      associate: function (models) {
        Client.hasMany(models.Payment, { foreignKey: 'ClientId', as: 'clientPayments' })
        Client.hasMany(models.Inspector, { foreignKey: 'ClientId', as: 'clientInspectors' })
        Client.hasMany(models.ClientZipCode, { foreignKey: 'ClientId', as: 'clientZipCodes' })
        Client.hasMany(models.Contract, { foreignKey: 'ClientId', as: 'clientContract' })
        Client.hasMany(models.ParkingZone, { foreignKey: 'ClientId', as: 'clientParkingZones' })
      }
    }
  )
  return Client
}
