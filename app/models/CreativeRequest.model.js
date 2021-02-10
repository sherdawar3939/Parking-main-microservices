'use strict'

module.exports = function (sequelize, DataTypes) {
  let CreativeRequest = sequelize.define('CreativeRequest',
    {
      uid: {
        type: DataTypes.STRING(20)
      },
      qty: {
        type: DataTypes.INTEGER(11)
      },
      status: {
        type: DataTypes.STRING(20),
        comment: 'Pending, InProcess, Dispatched'
      },
      UpdatedBy: {
        type: DataTypes.INTEGER(11)
      }
    }
  )
  return CreativeRequest
}
