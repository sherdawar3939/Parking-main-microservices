'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const _ = require('lodash')

/** Create Creative Requests */
const createParkingHelper = async (data) => {
  const parkingCreatedData = {}
  const UserVehicle = await db.UserVehicle.findOne({
    where: {
      id: data.UserVehicleId
    }
  })
  const parkingZone = await db.ParkingZone.findOne({
    where: {
      id: data.ParkingZoneId
    }
  })
  parkingCreatedData.licensePlate = UserVehicle.dataValues.licensePlate
  parkingCreatedData.quantity = UserVehicle.dataValues.quantity
  parkingCreatedData.parkingCharges = parkingZone.dataValues.fee
  parkingCreatedData.status = 'Started'
  parkingCreatedData.startedOn = new Date()
  parkingCreatedData.UserVehicleId = data.UserVehicleId
  parkingCreatedData.ParkingZoneId = data.ParkingZoneId

  return db.Parking.create(parkingCreatedData)
}
/** Fetch Creative Request List */
function ActiveParkingListHelper (conditions, limit, offset) {
  let parkingWhere = {}
  const parkingZoneWhere = {}
  let includes = [{
    where: parkingZoneWhere,
    model: db.ParkingZone,
    as: 'parkingZone',
    attributes: ['uid', 'fee', 'zip']
  }]

  if (conditions.ClientId) {
    parkingZoneWhere.ClientId = conditions.ClientId
  }

  if (conditions.ParkingZoneId) {
    parkingWhere.ParkingZoneId = conditions.ParkingZoneId
  }

  if (conditions.status === 'Active') {
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

  console.log('include', includes)
  return db.Parking.findAll({
    where: parkingWhere,
    limit: limit,
    offset: offset,
    include: includes
  })
}
const endParkingHelper = (id) => {
  let bill = {}
  console.log(id)
  // TIMESTAMPDIFF(SECOND, '2012-06-06 13:13:55', '2012-06-06 15:20:18')
  let query = `SELECT *, Parkings.id as ParkingId FROM Parkings
  INNER JOIN ParkingZones ON Parkings.ParkingZoneId = ParkingZones.id
  WHERE status='STARTED' AND Parkings.id=${id}`

  console.log(query)

  return db.sequelize.query(query, {
    type: db.sequelize.QueryTypes.SELECT
  })
    .then((result) => {
      if (!result || !result.length) {
        return {}
      }
      console.log(result)
      result = result[0]

      let profit = 0.05
      let totalSeconds = (new Date() - new Date(result.startedOn)) / 1000
      let parkingFeePerSec = (result.fee / 60) / 60
      let parkingCharges = parkingFeePerSec * totalSeconds
      let total = parkingCharges + profit

      bill = { status: 'Ended', endedOn: new Date(), parkingCharges, totalSeconds, total, profit }
      db.Parking.update(
        bill,
        { where: { id: id } }
      )

      // const create_payment_json = JSON.stringify({
      //   intent: 'sale',
      //   payer: {
      //     payment_method: 'paypal'
      //   },
      //   redirect_urls: {
      //     return_url: 'http://trainthedoggo.com/smart-phone/paid/' + id,
      //     cancel_url: 'http://localhost:3000/cancel'
      //   },
      //   transactions: [{
      //     amount: {
      //       total: total.toFixed(2),
      //       currency: 'EUR'
      //     },
      //     description: 'This is the payment for parking fee.'
      //   }]
      // })

      // return getPaypalLink(create_payment_json)
    })
    .then((payment) => {
      let paypalUrl = payment.links.filter(link => link.rel === 'approval_url')
      if (paypalUrl && paypalUrl.length) {
        bill.paypalUrl = paypalUrl[0].href
      } else {
        bill.paypalUrl = {}
      }
      return bill
    })
    .catch((error) => {
      console.log('Error', error /* error.response.details[0] */)
    })
}
module.exports = {
  createParkingHelper,
  ActiveParkingListHelper,
  endParkingHelper
}
