'use strict'

module.exports = function (sequelize, DataTypes) {
  let Inspectors = sequelize.define('Inspectors',
    {
      fName: {
        type: DataTypes.STRING(50)
      },
      lName: {
        type: DataTypes.STRING(50)
      },
      ClientId: {
        type: DataTypes.INTEGER(11)
      },
      UserId: {
        type: DataTypes.INTEGER(11)
      }
    }
  )
  return Inspectors
}
