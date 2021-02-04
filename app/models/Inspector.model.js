'use strict'

module.exports = function (sequelize, DataTypes) {
  let Inspector = sequelize.define('Inspector',
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
  return Inspector
}
