'use strict'

module.exports = function (sequelize, DataTypes) {
  let Cities = sequelize.define('Cities',
    {
      name: {
        type: DataTypes.STRING(50)
      },
      CountryId: {
        type: DataTypes.INTEGER(11)
      },
    }
  )
  return Cities
}
