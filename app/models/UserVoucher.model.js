'use strict'

module.exports = function (sequelize, DataTypes) {
  let UserVoucher = sequelize.define('UserVoucher', {
    UserVehicleId: {
      type: DataTypes.INTEGER(11)
    },
    UserId: {
      type: DataTypes.INTEGER(11)
    },
    expiryDate: {
      type: DataTypes.DATE
    },
    paymentStatus: {
      type: DataTypes.ENUM(['Pending', 'Paid']),
      allowNull: false,
      defaultValue: 'Pending'
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    associate: function (models) {
    //   UserVoucher.hasMany(models.Voucher, { foreignKey: 'UserVoucherId', as: 'UserVoucher' })
    }
  })
  return UserVoucher
}
