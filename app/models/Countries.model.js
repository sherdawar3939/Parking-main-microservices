'use strict'

module.exports = function (sequelize, DataTypes) {
  let Countries = sequelize.define('Countries',
    {
      name: {
        type: DataTypes.STRING(50)
      },
      iso: {
        type: DataTypes.STRING(5)
      },
    }
  )
  return Countries
}
