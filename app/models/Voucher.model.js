'use strict'

module.exports = function (sequelize, DataTypes) {
  let Voucher = sequelize.define('Voucher', {
    fee: {
      type: DataTypes.DECIMAL(8, 2)
    },
    uid: {
      type: DataTypes.STRING(50)
    },
    zip: {
      type: DataTypes.STRING(50)
    },
    validityDays: {
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      Voucher.belongsTo(models.Client, { foreignKey: 'ClientId', as: 'clientVoucher' })
      Voucher.hasMany(models.UserVoucher, { foreignKey: 'VoucherId', as: 'userVouchers' })
    }
  })
  return Voucher
}
