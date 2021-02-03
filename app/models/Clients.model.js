'use strict'

module.exports = function (sequelize, DataTypes) {
  let Clients = sequelize.define('Clients',
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
      },
    }
  )
  return Clients
}
