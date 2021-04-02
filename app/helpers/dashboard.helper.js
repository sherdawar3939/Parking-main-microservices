'use strict'
var sequelize = require('sequelize')
const Op = sequelize.Op
const db = require('../config/sequelize.config')

const getDashboardDetails = async (conditions) => {
  const usersCountQuery = await db.User.count({
    where: {
      isDeleted: false,
      isBlocked: false,
      RoleId: 1
    }
  })
  const clientCountQuery = await db.Client.count({ raw: true })
  const totalActiveStatus = await db.Parking.count({
    where: {
      status: 'Active'
    }
  })
  const parkingZoneCountQuery = await db.ParkingZone.count({ raw: true })
  return { usersCountQuery: usersCountQuery, clientCountQuery: clientCountQuery, totalActiveStatus: totalActiveStatus, parkingZoneCountQuery: parkingZoneCountQuery }
}

const getDashboardClientCounts = async (id) => {
  const InspectorCountQuery = await db.Inspector.count({ where: { ClientId: id } })
  console.log('count', InspectorCountQuery)

  // return InspectorCountQuery
  const ParkingCounts = await db.ParkingZone.findAll({
    raw: true,
    nest: false,
    where: {
      ClientId: id
    },
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('parkingZoneParkings.status')), 'parkingCounts']

    ],
    include: [{
      model: db.Parking,
      as: 'parkingZoneParkings',
      attributes: [],
      where: {
        status: 'Active'
      }
    }],
    group: ['ClientId']
  }).catch((error) => {
    console.log(error)
  })

  let parkingCount = 0
  if (ParkingCounts.length) {
    parkingCount = ParkingCounts[0].parkingCounts
  }
  return { InspectorCountQuery: InspectorCountQuery, parkingCounts: parkingCount }
}

const getClientRevenueDetails = (conditions, field = 'adminProfit') => {
  // SQL Raw query For finding Profit Sum BY DAE_FORMATE
  const where = []
  let query = `SELECT SUM(${field}) as value, 
  DATE_FORMAT(p.startedOn,'%d %M, %Y') as startedOn FROM Parkings as p
  INNER JOIN ParkingZones as pz ON pz.id = p.ParkingZoneId`

  if (conditions.ClientId) {
    where.push(`pz.ClientId = ${conditions.ClientId}`)
  }
  if (conditions.startDate) {
    where.push(` p.startedOn >= '${conditions.startDate}'`)
  }
  if (conditions.endDate) {
    where.push(` p.startedOn <= '${conditions.endDate}'`)
  }

  if (where.length) {
    query = query + ' WHERE ' + where.join(' AND ')
  }

  query += ` GROUP BY DATE(p.startedOn)
  ORDER BY DATE(p.startedOn) ASC`

  return db.sequelize.query(query, {
    type: db.sequelize.QueryTypes.SELECT
  })
    .then((result) => {
      const response = {
        x: [],
        y: []
      }
      if (!result || !result.length) {
        return response
      }
      result.forEach(element => {
        response.x.push(element.startedOn)
        response.y.push(element.value)
      })
      return response
    })
    .catch((error) => {
      console.log('Error', error /* error.response.details[0] */)
    })
}

const getParkingCounts = async (conditions) => {
  let where = {}
  if (conditions.startDate) {
    where = [sequelize.where(sequelize.fn('date', sequelize.col('Parking.createdAt')), '>=', conditions.startDate)]
  }
  if (conditions.endDate) {
    where = [sequelize.where(sequelize.fn('date', sequelize.col('Parking.createdAt')), '<=', conditions.endDate)]
  }
  if (conditions.startDate && conditions.endDate) {
    where = {
      [Op.and]: [
        [sequelize.where(sequelize.fn('date', sequelize.col('Parking.createdAt')), '>=', conditions.startDate)],
        [sequelize.where(sequelize.fn('date', sequelize.col('Parking.createdAt')), '<=', conditions.endDate)]
      ]
    }
  }
  const parkingCount = await db.Parking.count({
    where
  })

  return { parkingCount: parkingCount }
}

const getReportListing = async (conditions) => {
  let where = {}
  let ClientWhere = {}
  if (conditions.ClientId) {
    ClientWhere.ClientId = conditions.ClientId
  }

  if (conditions.startDate) {
    where = [sequelize.where(sequelize.fn('date', sequelize.col('Parking.createdAt')), '>=', conditions.startDate)]
  }
  if (conditions.endDate) {
    where = [sequelize.where(sequelize.fn('date', sequelize.col('Parking.createdAt')), '<=', conditions.endDate)]
  }
  if (conditions.startDate && conditions.endDate) {
    where = {
      [Op.and]: [
        [sequelize.where(sequelize.fn('date', sequelize.col('Parking.createdAt')), '>=', conditions.startDate)],
        [sequelize.where(sequelize.fn('date', sequelize.col('Parking.createdAt')), '<=', conditions.endDate)]
      ]
    }
  }

  if (conditions.status === 'Ended') {
    where.status = 'Ended'
  }

  const list = await db.Parking.findAll({
    where,
    attributes: ['licensePlate', 'clientProfit', 'clientTax', 'status', 'adminProfit', 'adminTax', 'total', 'paymentStatus', 'createdAt', 'updatedAt'],
    include: [{
      attributes: ['uid'],
      model: db.ParkingZone,
      as: 'parkingZone',
      where: ClientWhere,
      include: [{
        attributes: ['companyName', 'address'],
        model: db.Client,
        as: 'parkingZoneClient'
      }]
    }]
  })
  const detail = list.map(data => {
    return {
      companyName: data.dataValues.parkingZone.parkingZoneClient.companyName,
      address: data.dataValues.parkingZone.parkingZoneClient.address,
      licensePlate: data.dataValues.licensePlate,
      adminProfit: data.dataValues.adminProfit,
      adminTax: data.dataValues.adminTax,
      clientProfit: data.dataValues.clientProfit,
      clientTax: data.dataValues.clientTax,
      total: data.dataValues.total,
      status: data.dataValues.status,
      paymentStatus: data.dataValues.paymentStatus,
      createdAt: data.dataValues.createdAt,
      updatedAt: data.dataValues.updatedAt,
      uid: data.dataValues.parkingZone.uid
    }
  })
  return detail
}

/** parking Zone Reporting */
const parkingZoneOverview = async (conditions) => {
  let where = {}
  let parkingWhere = {}
  let inspectionWhere = {}

  if (conditions.fromDate) {
    parkingWhere = [sequelize.where(sequelize.fn('date', sequelize.col('Parking.createdAt')), '>=', conditions.fromDate)]
    inspectionWhere = [sequelize.where(sequelize.fn('date', sequelize.col('Inspection.createdAt')), '>=', conditions.fromDate)]
  }
  if (conditions.toDate) {
    parkingWhere = [sequelize.where(sequelize.fn('date', sequelize.col('Parking.createdAt')), '<=', conditions.toDate)]
    inspectionWhere = [sequelize.where(sequelize.fn('date', sequelize.col('Inspection.createdAt')), '>=', conditions.toDate)]
  }
  if (conditions.fromDate && conditions.toDate) {
    parkingWhere = {
      [Op.and]: [
        [sequelize.where(sequelize.fn('date', sequelize.col('Parking.createdAt')), '>=', conditions.fromDate)],
        [sequelize.where(sequelize.fn('date', sequelize.col('Parking.createdAt')), '<=', conditions.toDate)]
      ]
    }
    inspectionWhere = {
      [Op.and]: [
        [sequelize.where(sequelize.fn('date', sequelize.col('Inspection.createdAt')), '>=', conditions.fromDate)],
        [sequelize.where(sequelize.fn('date', sequelize.col('Inspection.createdAt')), '<=', conditions.toDate)]
      ]
    }
  }

  if (conditions.ClientId) {
    where.ClientId = conditions.ClientId
  }

  const listingParkingZone = await db.ParkingZone.findAll({
    where,
    raw: true,
    include: [{
      model: db.City,
      attributes: ['name'],
      as: 'cityParkingZone'
    }]
  }).catch((error) => {
    console.log(error)
  })

  for (let i = 0; i < listingParkingZone.length; i++) {
    const ParkingCounts = await db.Parking.count({ where: { ...{ ParkingZoneId: listingParkingZone[i].id }, ...parkingWhere } }).catch((error) => {
      console.log(error)
    })

    listingParkingZone[i].parkingCount = ParkingCounts

    const InspectionCounts = await db.Inspection.count({ where: { ...{ ParkingZoneId: listingParkingZone[i].id }, ...inspectionWhere } }).catch((error) => {
      console.log(error)
    })
    listingParkingZone[i].inspections = InspectionCounts
    let WHERE = []
    let calculationsQuery = `SELECT SUM(adminProfit + clientProfit) as profit, SUM(clientTax+adminTax) as tax, SUM(total) as total 
    FROM parkings as p WHERE ParkingZoneId=${listingParkingZone[i].id}`

    if (conditions.fromDate) {
      WHERE.push(` p.createdAt >= '${conditions.fromDate}'`)
    }
    if (conditions.toDate) {
      WHERE.push(` p.createdAt <= '${conditions.toDate}'`)
    }

    if (WHERE.length) {
      calculationsQuery = calculationsQuery + ' AND ' + WHERE.join(' AND ')
    }

    listingParkingZone[i].calculationsQuery = await db.sequelize.query(calculationsQuery, {
      type: db.sequelize.QueryTypes.SELECT
    }).catch((error) => {
      console.log(error)
    })
  }
  return listingParkingZone
}

/** Seasonal Voucher Sold */
const seasonalVoucherSold = async (conditions) => {
  let where = {}
  let voucherWhere = {}

  if (conditions.fromDate) {
    voucherWhere = [sequelize.where(sequelize.fn('date', sequelize.col('UserVoucher.createdAt')), '>=', conditions.fromDate)]
  }
  if (conditions.toDate) {
    voucherWhere = [sequelize.where(sequelize.fn('date', sequelize.col('UserVoucher.createdAt')), '<=', conditions.toDate)]
  }
  if (conditions.fromDate && conditions.toDate) {
    voucherWhere = {
      [Op.and]: [
        [sequelize.where(sequelize.fn('date', sequelize.col('UserVoucher.createdAt')), '>=', conditions.fromDate)],
        [sequelize.where(sequelize.fn('date', sequelize.col('UserVoucher.createdAt')), '>=', conditions.toDate)]
      ]
    }
  }

  if (conditions.ClientId) {
    where.ClientId = conditions.ClientId
  }

  const listingVouchers = await db.Voucher.findAll({
    where,
    raw: true
  }).catch((error) => {
    console.log(error)
  })

  for (let i = 0; i < listingVouchers.length; i++) {
    const SeasonalTicketSold = await db.UserVoucher.count({ where: { ...{ VoucherId: listingVouchers[i].id }, ...voucherWhere }
    }).catch((error) => {
      console.log(error)
    })
    listingVouchers[i].SeasonalTicketSold = SeasonalTicketSold
    let WHERE = []
    let calculationsQuery = `SELECT SUM(adminProfit + clientProfit) as profit, SUM(clientTax+adminTax) as tax, SUM(fee) as fee, count(id) as sold
    FROM uservouchers as p WHERE VoucherId=${listingVouchers[i].id}`

    if (conditions.fromDate) {
      WHERE.push(` p.createdAt >= '${conditions.fromDate}'`)
    }
    if (conditions.toDate) {
      WHERE.push(` p.createdAt <= '${conditions.toDate}'`)
    }

    if (WHERE.length) {
      calculationsQuery = calculationsQuery + ' AND ' + WHERE.join(' AND ')
    }

    const finance = await db.sequelize.query(calculationsQuery, {
      type: db.sequelize.QueryTypes.SELECT
    }).catch((error) => {
      console.log(error)
    })

    listingVouchers[i].finance = finance.length > 0 ? finance[0] : finance
  }
  return listingVouchers
}

// /** Valid Seasonal Voucher */
const validSeasonalPass = async (conditions) => {
  let where = {}

  if (conditions.ClientId) {
    where.ClientId = conditions.ClientId
  }

  const voucherData = await db.Voucher.findAll({
    where,
    include: [{
      model: db.UserVoucher,
      as: 'userVouchers'
    }]
  }).catch((error) => {
    console.log(error)
  })

  for (let i = 0; i < voucherData.length; i++) {
    let todayDate = new Date()
    let userVoucherCounts = await db.UserVoucher.count({ expiryDate: {
      [Op.lt]: todayDate
    } }).catch((error) => { console.log(error) })
    console.log(voucherData[0].dataValues)
    voucherData[i].dataValues.userVoucherCounts = userVoucherCounts
  }
  return voucherData
}

module.exports = {
  getDashboardDetails,
  getDashboardClientCounts,
  getClientRevenueDetails,
  getParkingCounts,
  getReportListing,
  parkingZoneOverview,
  seasonalVoucherSold,
  validSeasonalPass
}
