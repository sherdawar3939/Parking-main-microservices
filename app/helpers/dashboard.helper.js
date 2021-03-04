'use strict'
// const _ = require('lodash')
var Sequelize = require('sequelize')
// const Op = Sequelize.Op
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
    where:
       { status: 'Active'
       }
  })
  const parkingZoneCountQuery = await db.ParkingZone.count({ raw: true })
  return { usersCountQuery: usersCountQuery, clientCountQuery: clientCountQuery, totalActiveStatus: totalActiveStatus, parkingZoneCountQuery: parkingZoneCountQuery }
}

const getDashboardClientCounts = async (id, res, next) => {
  const InspectorCountQuery = await db.Inspector.count({ where: { ClientId: id } })
  // return InspectorCountQuery
  const ParkingCounts = await db.ParkingZone.findAll({
    raw: true,
    nest: false,
    where: {
      ClientId: id
    },
    attributes: [
      [Sequelize.fn('COUNT', Sequelize.col('parkingZoneParkings.status')), 'parkingCounts']

    ],
    include: [{
      model: db.Parking,
      as: 'parkingZoneParkings',
      attributes: [],
      where: {
        status: 'Active'
      }
    }
    ],
    group: ['ClientId']
  })
  // return ParkingCounts

  return { InspectorCountQuery: InspectorCountQuery, ParkingCounts: ParkingCounts }
}

const getClientRevenueDetails = async () => {
  return db.Client.findAll({
    attributes: [
      [Sequelize.literal(`DATE("createdAt")`), 'date'],
      [Sequelize.literal(`COUNT(*)`), 'count']
    ],
    group: ['date']
  })
}

module.exports = {
  getDashboardDetails,
  getDashboardClientCounts,
  getClientRevenueDetails
}
