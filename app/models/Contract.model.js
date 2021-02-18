'use strict'

module.exports = function (sequelize, DataTypes) {
    let Contract = sequelize.define('Contract',
        {
            data: {
                type: DataTypes.STRING(50)
            },
            status: {
                type: DataTypes.ENUM({ values: ['PENDING', 'APPROVED', 'REJECTED'] }),
                allowNull: false,
                defaultValue: 'PENDING',
                field: 'status'
            },
        }, {
        associate: function (models) {
            Contract.belongsTo(models.Client, { foreignKey: 'ClientId', as: 'contractClient' })
            Contract.belongsTo(models.User, { foreignKey: 'UserId', as: 'contractUser' })
        }
    }
    )
    return Contract
}
