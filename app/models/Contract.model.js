'use strict'

module.exports = function (sequelize, DataTypes) {
  let Contract = sequelize.define('Contract', {
    data: {
      type: DataTypes.STRING(1500),
      allowNull: false,
      field: 'data'
    },
    status: {
      type: DataTypes.ENUM(['PENDING', 'APPROVED', 'CANCELED', 'REJECTED']),
      allowNull: false,
      defaultValue: 'PENDING'
    },
    contractUrl: {
      type: DataTypes.STRING()
    },
    uid: {
      type: DataTypes.STRING(50)
    },
    type: {
      type: DataTypes.ENUM(['General', 'ParkingZone', 'Voucher']),
      allowNull: false,
      defaultValue: 'General'
    },
    RefId: {
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      Contract.belongsTo(models.Client, { foreignKey: 'ClientId', as: 'clientContracts' })
      Contract.belongsTo(models.User, { foreignKey: 'UserId', as: 'contractUser' })
    }
  })
  return Contract
}
