const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

const createUserVoucher = (userData) => {
  return db.Voucher.findOne({
    where: { id: userData.VoucherId },
    raw: true
  })
    .then((foundVoucher) => {
      if (!foundVoucher) {
        return generalHelpingMethods.rejectPromise({
          field: 'VoucherId',
          error: 3456,
          message: 'No Record Exists.'
        })
      }
      var date = new Date()

      return db.UserVoucher.create({
        UserVehicleId: userData.UserVehicleId,
        VoucherId: userData.VoucherId,
        UserId: userData.UserId,
        fee: foundVoucher.fee,
        expiryDate: date.setDate(date.getDate() + foundVoucher.validityDays)
      })
    })
}

const updateUserVoucher = (id, data) => {
  return db.UserVoucher.findOne({ where: { id } })
    .then((foundUserVoucher) => {
      if (!foundUserVoucher) {
        return generalHelpingMethods.rejectPromise({
          field: 'id',
          error: 'HUUV-0001',
          message: 'No Record Exists.'
        })
      }
      return db.UserVoucher.update(data, {
        where: {
          id: foundUserVoucher.id
        }
      })
    })
}

function deleteUserVoucherID (id) {
  return db.UserVoucher.findOne({ where: { id: id } })
    .then((foundUserVoucher) => {
      if (!foundUserVoucher) {
        return generalHelpingMethods.rejectPromise({
          field: 'id',
          error: 'HDUV-0002',
          message: 'No Record Exists.'
        })
      }
      return db.UserVoucher.update({ isDeleted: true }, {
        where: {
          id: id
        }
      })
    })
}

function getUserVoucherID (id) {
  return db.UserVoucher.findAll({
    where: {
      id
    },
    include: [{
      model: db.UserVehicle,
      as: 'userVehicle',
      attributes: ['licensePlate'],
      where: { isDeleted: false }
    }]
  })
}

function getUserVoucherList (conditions) {
  let where = {}

  if (conditions.UserId) {
    where.UserId = conditions.UserId
  }

  if (conditions.UserVehicleId) {
    where.UserVehicleId = conditions.UserVehicleId
  }

  if (conditions.VoucherId) {
    where.VoucherId = conditions.VoucherId
  }

  if (conditions.paymentStatus) {
    where.paymentStatus = conditions.paymentStatus
  }

  return db.UserVoucher.findAll({
    where,
    include: [{
      model: db.UserVehicle,
      as: 'userVehicle',
      attributes: ['licensePlate'],
      where: { isDeleted: false },
      required: true
    }, {
      model: db.Voucher,
      as: 'voucher',
      attributes: ['zip']
    },
    {
      model: db.User,
      as: 'UserVouchersUser',
      attributes: ['fname','lname']
    }]
  })
}
module.exports = { createUserVoucher, updateUserVoucher, deleteUserVoucherID, getUserVoucherID, getUserVoucherList }
