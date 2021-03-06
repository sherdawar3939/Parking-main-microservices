'use strict'
const db = require('../config/sequelize.config')
const Op = db.Sequelize.Op
const generalHelper = require('./general.helper')
const paypal = require('paypal-rest-sdk')
paypal.configure({
  'mode': 'sandbox', // sandbox or live
  'client_id': 'AcaLzKSb7p64VlLI__UWvOS0TJSeuBluAbbAsfkC5GwalU6xEqUvZDLa45d_O4NpwggWTpXeAdVkgAY6',
  'client_secret': 'EImio5Sa03mU60yEhQWjmmVvHS5BSOIoFXNQuCsSNWZCtG4U8yvneuWWaKvlbgNVJtQhuUTx-l6MIYwU'
})

/** Create Creative Requests */
const createParkingHelper = (data) => {
  return db.ParkingZone.findOne({
    where: {
      id: data.ParkingZoneId,
      status: 'Active'
      // activeAfter: {
      //   [Op.lt]: new Date()
      // }
    },
    raw: true
  })
    .then(async (parkingZone) => {
      if (!parkingZone) {
        return generalHelper.rejectPromise([{
          field: 'clientCount',
          error: 1540,
          message: 'Parking zone is not valid'
        }])
      }

      const parkingCreatedData = {}
      const userVehicle = await db.UserVehicle.findOne({
        where: {
          licensePlate: data.licensePlate,
          isDeleted: false
        },
        raw: true
      })

      if (userVehicle) {
        parkingCreatedData.UserVehicleId = userVehicle.id
        parkingCreatedData.quantity = userVehicle.quantity
      }

      parkingCreatedData.licensePlate = data.licensePlate
      // parkingCharges from ParkingZone fee
      parkingCreatedData.parkingCharges = parkingZone.fee / 60
      // Quantity Calculations
      parkingCreatedData.status = 'Started'
      parkingCreatedData.startedOn = new Date()
      parkingCreatedData.UserId = data.UserId
      parkingCreatedData.ParkingZoneId = data.ParkingZoneId
      // clientProfit = Quantity * Tax

      return db.Parking.create(parkingCreatedData)
    })
}
/** Fetch Creative Request List */
function ActiveParkingListHelper (conditions, limit, offset) {
  let parkingWhere = {}
  const parkingZoneWhere = {}
  let includes = []

  if (conditions.search) {
    parkingWhere[Op.or] = {
      licensePlate: {
        [Op.like]: '%' + conditions.search + '%'
      }
    }
  }

  if (conditions.ClientId) {
    parkingZoneWhere.ClientId = conditions.ClientId
  }

  if (conditions.ParkingZoneId) {
    parkingWhere.ParkingZoneId = conditions.ParkingZoneId
  }

  if (conditions.UserId) {
    parkingWhere.UserId = conditions.UserId
  }

  if (conditions.status) {
    parkingWhere.status = conditions.status
  }

  if (conditions.VehicleCategoryId) {
    includes.push({
      model: db.UserVehicle,
      as: 'parkingUserVehicle',
      attributes: [],
      where: {
        VehicleCategoryId: conditions.VehicleCategoryId,
        isDeleted: false
      },
      required: true
    })
  }

  includes.push({
    model: db.ParkingZone,
    as: 'parkingZone',
    where: parkingZoneWhere
  })

  return db.Parking.findAndCountAll({
    where: parkingWhere,
    include: includes,
    limit: limit,
    offset: offset
  })
    .catch(generalHelper.catchException)
}

const endParkingHelper = (id) => {
  let bill = {}
  // TIMESTAMPDIFF(SECOND, '2012-06-06 13:13:55', '2012-06-06 15:20:18')
  let query = `SELECT *, Parkings.id as ParkingId FROM Parkings
  INNER JOIN ParkingZones ON Parkings.ParkingZoneId = ParkingZones.id
  WHERE Parkings.status='Started' AND Parkings.id=${id}`

  return db.sequelize.query(query, {
    type: db.sequelize.QueryTypes.SELECT
  })
    .then(async (result) => {
      if (!result || !result.length) {
        return {}
      }
      result = result[0]
      let countryTax = 0

      await db.City.findOne({
        where: {
          id: result.CityId
        },
        include: {
          model: db.Country,
          as: 'cityCountry'
        }
      })
        .then((foundCity) => {
          if (foundCity) {
            countryTax = parseFloat(foundCity.cityCountry.tax) / 100
          }
        })

      const foundVoucher = await db.UserVoucher.findOne({
        raw: true,
        where: {},
        include: [{
          model: db.UserVehicle,
          as: 'userVehicle',
          attributes: ['licensePlate'],
          where: {
            licensePlate: result.licensePlate
          },
          required: true
        }, {
          model: db.Voucher,
          as: 'userVouchers',
          attributes: ['zip', 'uid'],
          where: {
            zip: result.zip
          }
        }]
      })

      let adminProfit = 0.5
      let adminTax = adminProfit * countryTax
      let totalSeconds = (new Date() - new Date(result.startedOn)) / 1000
      let parkingFeePerSec = (result.fee / 60) / 60
      let parkingCharges = parkingFeePerSec * totalSeconds
      let clientProfit = parkingCharges
      let clientTax = parkingCharges * countryTax
      let total = parkingCharges + clientTax + adminProfit + adminTax

      if (foundVoucher) {
        bill = { status: 'Ended', endedOn: new Date(), totalSeconds, parkingCharges: 0, clientTax: 0, clientProfit: 0, adminTax: 0, adminProfit: 0, total: 0 }
      } else {
        bill = { status: 'Ended', endedOn: new Date(), totalSeconds, parkingCharges, clientTax, clientProfit, adminTax, adminProfit, total }
      }
      console.log(bill)
      db.Parking.update(
        bill, { where: { id: id } }
      )

      if (bill.total <= 0) {
        return {}
      }

      const createPaymentJson = JSON.stringify({
        intent: 'sale',
        payer: {
          payment_method: 'paypal'
        },
        redirect_urls: {
          return_url: 'https://parking-user.gplroad.com/parking/paid/' + id,
          cancel_url: 'http://localhost:3000/cancel'
        },
        transactions: [{
          amount: {
            total: total.toFixed(2),
            currency: 'EUR'
          },
          description: `Parking Zone: ${result.uid}, License Plate: ${result.licensePlate}`
        }]
      })

      return getPaypalLink(createPaymentJson)
      // return bill
    })
    .then((payment) => {
      bill.paypalUrl = ''
      if (payment && bill.total > 0) {
        let paypalUrl = payment.links.filter(link => link.rel === 'approval_url')
        if (paypalUrl && paypalUrl.length) {
          bill.paypalUrl = paypalUrl[0].href
        }
      }
      return bill
    })
    .catch((error) => {
      console.log('Error', error /* error.response.details[0] */)
    })
}

const getPaypalLink = (createPaymentJson) => {
  return new Promise((resolve, reject) => {
    paypal.payment.create(createPaymentJson, function (error, payment) {
      if (error) {
        reject(error)
      } else {
        console.log('Create Payment Response')
        console.log(payment)
        resolve(payment)
      }
    })
  })
}

const executeTransaction = (executePaymentJson, paymentId) => {
  return new Promise((resolve, reject) => {
    paypal.payment.execute(paymentId, executePaymentJson, function (error, payment) {
      if (error) {
        console.log(error.response)
        reject(error)
      } else {
        console.log(JSON.stringify(payment))
        resolve(payment)
      }
    })
  })
}

const paymentVerifiedHelper = (data) => {
  return db.Parking.findOne({
    where: {
      id: data.ParkingId
    }
  })
    .then((foundParking) => {
      console.log('===>', parseFloat(foundParking.total), parseFloat(foundParking.total).toFixed(2))
      const executePaymentJson = {
        'payer_id': data.PayerID,
        'transactions': [{
          'amount': {
            'currency': 'EUR',
            'total': parseFloat(foundParking.total).toFixed(2)
          }
        }]
      }

      executeTransaction(executePaymentJson, data.paymentId)
        .then((result) => {
          console.log('----------- Done -------')
        })

      foundParking.PayerID = data.PayerID
      foundParking.paymentId = data.paymentId
      foundParking.paymentStatus = 'Paid'
      return foundParking.save()
    })

  // return db.Parking.update(
  //   { PayerID: data.PayerID, paymentId: data.paymentId },
  //   { where: { id: data.ParkingId } }
  // )
}

const parkingCharges = (data, id) => {
  return db.Parking.findOne({
    where: { id: id }
  })
    .then((parkingExist) => {
      console.log(parkingExist)
    })
}
module.exports = {
  createParkingHelper,
  ActiveParkingListHelper,
  endParkingHelper,
  paymentVerifiedHelper,
  parkingCharges
}
