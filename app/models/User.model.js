'use strict'
let crypto = require('crypto')

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define('User', {
    fName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lName: {
      type: DataTypes.STRING(50)
    },
    email: {
      type: DataTypes.STRING(100),
      isEmail: true,
      unique: true,
      allowNull: false
    },
    imageUrl: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING(16)
    },
    otp: DataTypes.STRING(40),
    language: DataTypes.STRING(5),
    otpValidTill: DataTypes.DATE,
    hashedPassword: DataTypes.STRING,
    salt: DataTypes.STRING,
    RoleId: DataTypes.INTEGER(11),
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      User.belongsTo(models.Role, { foreignKey: 'RoleId' })
      User.hasMany(models.Parking, { foreignKey: 'UserId', as: 'userParking' })
      User.hasMany(models.UserVehicle, { foreignKey: 'UserId', as: 'userVehicle' })
      User.hasMany(models.Payment, { foreignKey: 'UserId', as: 'userPayment' })
      User.hasOne(models.Inspector, { foreignKey: 'UserId', as: 'userInspector' })
      User.hasMany(models.Contract, { foreignKey: 'UserId', as: 'userContract' })
      User.hasOne(models.Client, { foreignKey: 'UserId', as: 'clientUser' })
      User.hasMany(models.CreativeRequest, { foreignKey: 'UpdatedBy', as: 'creativeRequestHandler' })
      User.hasMany(models.UserVoucher, { foreignKey: 'UserId', as: 'UserVouchersUser' })
    }
  })

  User.prototype.toJSON = function () {
    var values = this.get()
    delete values.hashedPassword
    delete values.salt
    delete values.otp
    delete values.otpValidTill
    delete values.balance
    return values
  }

  User.prototype.makeSalt = function () {
    return crypto.randomBytes(16).toString('base64')
  }

  User.prototype.authenticate = function (plainText) {
    return this.encryptPassword(plainText, this.salt).toString() === this.hashedPassword.toString()
  }

  User.prototype.encryptPassword = function (password, salt) {
    if (!password || !salt) {
      return ''
    }
    salt = new Buffer.from(salt, 'base64')
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64')
  }

  return User
}
