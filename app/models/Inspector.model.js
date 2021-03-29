'use strict'

module.exports = function (sequelize, DataTypes) {
  let Inspector = sequelize.define('Inspector', {
    ClientId: {
      type: DataTypes.INTEGER(11)
    },
    UserId: {
      type: DataTypes.INTEGER(11)
    }
  }, {
    associate: function (models) {
      Inspector.belongsTo(models.User, { foreignKey: 'UserId', as: 'userInspector' })
      Inspector.hasMany(models.Inspection, { foreignKey: 'InspectorId', as: 'Inspections' })
      Inspector.belongsTo(models.Client, { foreignKey: 'ClientId', as: 'company' })
    }
  })
  return Inspector
}
