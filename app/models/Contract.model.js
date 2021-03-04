'use strict'

module.exports = function(sequelize, DataTypes) {
    let Contract = sequelize.define('Contract', {
        data: {
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'data'
        },
        status: {
            type: DataTypes.ENUM(['PENDING', 'APPROVED', 'REJECTED']),
            allowNull: false,
            defaultValue: 'PENDING',
            field: 'status'
        }
    }, {
        associate: function(models) {
            Contract.belongsTo(models.Client, { foreignKey: 'ClientId', as: 'clientContracts' })
            Contract.belongsTo(models.User, { foreignKey: 'UserId', as: 'contractUser' })
        }
    })
    return Contract
}