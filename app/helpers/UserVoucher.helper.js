const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

const createUserVoucher = (userData) => {
  // console.log(userData.UserId, userData.UserVehicleId, userData.payemntStatus)
  console.log(userData)
  return db.UserVoucher.create({
    UserVehicleId: userData.UserVehicleId,
    VoucherId: userData.VoucherId,
    UserId: userData.UserId,
    fee: userData.fee,
    expiryDate: userData.expiryDate })
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
      as: 'UserVehicleVouchers',
      attributes: ['licensePlate'],
      where: { isDeleted: false }
    }]
  })
}

function getUserVoucherList (conditions) {
  return db.UserVoucher.findAll({
    where: conditions,
    include: [{
      model: db.UserVehicle,
      as: 'UserVehicleVouchers',
      attributes: ['licensePlate'],
      where: { isDeleted: false }
    }]
  })
}
module.exports = { createUserVoucher, updateUserVoucher, deleteUserVoucherID, getUserVoucherID, getUserVoucherList }
