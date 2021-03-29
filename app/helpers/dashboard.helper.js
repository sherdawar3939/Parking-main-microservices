'use strict'
// const _ = require('lodash')
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
module.exports = {
  getDashboardDetails,
  getDashboardClientCounts,
  getClientRevenueDetails,
  getParkingCounts,
  getReportListing
}
