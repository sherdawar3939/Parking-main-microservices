'use strict'

module.exports = function (sequelize, DataTypes) {
  let Laptop = sequelize.define('Laptop',
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      price: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
    }
  )

  return Laptop
}
