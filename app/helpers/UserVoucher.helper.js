const db = require('../config/sequelize.config')
const Op = db.Sequelize.Op
const generalHelpingMethods = require('./general.helper')

const createUserVoucher = (userData) => {
  let foundVoucher
  return db.Voucher.findOne({
    where: { id: userData.VoucherId },
    raw: true
  })
    .then((_foundVoucher) => {
      if (!_foundVoucher) {
        return generalHelpingMethods.rejectPromise({
          field: 'VoucherId',
          error: 'HCUV-0005',
          message: 'No Record Exists.'
        })
      }

      foundVoucher = _foundVoucher

      return db.UserVoucher.findOne({
        where: {
          UserVehicleId: userData.UserVehicleId,
          VoucherId: userData.VoucherId,
          expiryDate: {
            [Op.gte]: new Date()
          }
        }
      })
    })
    .then((foundUserVoucher) => {
      if (foundUserVoucher) {
        return generalHelpingMethods.rejectPromise([{
          field: 'general',
          error: 'HCUV-0010',
          message: 'You have already purchased a voucher for this vehicle.'
        }])
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
  let parkingwhere = {}
  let whereClient = {}

  if (conditions.UserId) {
    where.UserId = conditions.UserId
  }

  if (conditions.ClientId) {
    whereClient.ClientId = conditions.ClientId
  }

  if (conditions.UserVehicleId) {
    where.UserVehicleId = conditions.UserVehicleId
  }

  if (conditions.VoucherId) {
    where.VoucherId = conditions.VoucherId
  }

  if (conditions.licensePlate) {
    parkingwhere.licensePlate = conditions.licensePlate
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
      where: parkingwhere,
      required: true
    }, {
      model: db.Voucher,
      as: 'userVouchers',
      attributes: ['zip', 'uid']
    },
    {
      model: db.User,
      as: 'UserVouchersUser',
      attributes: ['fname', 'lname']
    }]
  })
}
module.exports = { createUserVoucher, updateUserVoucher, deleteUserVoucherID, getUserVoucherID, getUserVoucherList }
