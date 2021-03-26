const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

const createUserVoucher = async (userData) => {
  const voucherDetail = await db.Voucher.findOne({ id: userData.VoucherId })
  console.log(voucherDetail.dataValues)
  var date = new Date()

  await db.UserVoucher.create({
    UserVehicleId: userData.UserVehicleId,
    VoucherId: userData.VoucherId,
    UserId: userData.UserId,
    fee: voucherDetail.dataValues.fee,
    expiryDate: date.setDate(date.getDate() + voucherDetail.dataValues.validityDays)
  })
}

const updateUserVoucher = (id, data) => {
  return db.UserVoucher.findOne({ where: { id } })
    .then((foundUserVoucher) => {
      if (!foundUserVoucher) {
        return generalHelpingMethods.rejectPromise({
          field: 'id',
          error: 3456,
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
          error: 3456,
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
      as: 'UserVehicleVouchers',
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
      as: 'UserVehicleVouchers',
      attributes: ['licensePlate'],
      where: { isDeleted: false }
    }]
  })
}
module.exports = { createUserVoucher, updateUserVoucher, deleteUserVoucherID, getUserVoucherID, getUserVoucherList }
