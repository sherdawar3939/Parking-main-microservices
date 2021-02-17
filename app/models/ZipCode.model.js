'use strict'

module.exports = function(sequelize, DataTypes) {
    let ZipCode = sequelize.define('ZipCode', {
        zipCode: {
            type: DataTypes.STRING(5)
        },
        CityId: {
            type: DataTypes.INTEGER(11)
        }
    }, {
        associate: function(models) {
            ZipCode.hasMany(models.ClientZipCode, { foreignKey: 'ZipCodeId', as: 'zipCodes' })
        }
    })
    return ZipCode
}