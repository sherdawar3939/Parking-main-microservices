'use strict'

module.exports = function (sequelize, DataTypes) {
  let Payments = sequelize.define('Payments',
    {
      amount: {
        type: DataTypes.DECIMAL(11, 4)
      },
      paymentId: {
        type: DataTypes.STRING(50)
      },
      PayerID: {
        type: DataTypes.STRING(50)
      },
      paymentStatus: {
        type: DataTypes.STRING(20)
      },
      PaidBy: {
        type: DataTypes.INTEGER(11)
      },
      ClientId: {
        type: DataTypes.INTEGER(11)
      }
    }
  )
  return Payments
}
