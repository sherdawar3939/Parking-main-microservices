'use strict'

module.exports = function (sequelize, DataTypes) {
  let Client = sequelize.define('Client', {
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
    isProfile: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    balance: {
      type: DataTypes.DECIMAL(11, 4)
    },
    paymentFrequency: {
      type: DataTypes.ENUM('Daily', 'Weekly', 'Monthly')
    }

  }, {
    associate: function (models) {
      Client.hasMany(models.Payment, { foreignKey: 'ClientId', as: 'clientPayments' })
      Client.hasMany(models.Inspector, { foreignKey: 'ClientId', as: 'clientInspectors' })
      Client.hasMany(models.ParkingZone, { foreignKey: 'ClientId', as: 'parkingZoneClient' })
      Client.hasMany(models.Contract, { foreignKey: 'ClientId', as: 'clientContracts' })
      Client.belongsTo(models.User, { foreignKey: 'UserId', as: 'clientUser' })
      Client.belongsTo(models.Country, { foreignKey: 'CountryId', as: 'countryClient' })
      Client.hasMany(models.CreativeRequest, { foreignKey: 'ClientId', as: 'CreativeRequestClient' })
    }
  })
  return Client
}
