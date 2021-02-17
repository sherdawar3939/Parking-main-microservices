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
            Contract.hasOne(models.Client, { foreignKey: 'clientId', as: 'clientContract' })
            Contract.hasOne(models.User, { foreignKey: 'userId', as: 'approvedBy' })
            Contract.hasOne(models.User, { foreignKey: 'userId', as: 'rejectedBy' })

        }
    }
    )
    return Contract
}
