'use strict'

module.exports = function (sequelize, DataTypes) {
  let UserVoucher = sequelize.define('UserVoucher', {
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
    },
    UserVehicleId: {
      type: DataTypes.INTEGER(11)
    },
    UserId: {
      type: DataTypes.INTEGER(11)
    },
    VoucherId: {
      type: DataTypes.INTEGER(11)
    }
  }, {
    associate: function (models) {
      UserVoucher.belongsTo(models.Voucher, { foreignKey: 'VoucherId', as: 'UserVouchers' })
      UserVoucher.belongsTo(models.User, { foreignKey: 'UserId', as: 'UserVouchersUser' })
      UserVoucher.belongsTo(models.UserVehicle, { foreignKey: 'UserVehicleId', as: 'UserVehicleVouchers' })
    }
  })
  return UserVoucher
}
