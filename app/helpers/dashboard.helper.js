'use strict'
// const _ = require('lodash')
var Sequelize = require('sequelize')
const Op = Sequelize.Op
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
  let parkingCount
  if (ParkingCounts.length === 0) {
    parkingCount = 0
  } else {
    parkingCount = ParkingCounts[0].parkingCounts
  }
  return { InspectorCountQuery: InspectorCountQuery, parkingCounts: parkingCount }
}

const getClientRevenueDetails = (createdAt, updatedAt) => {
  const where = {
    [Op.or]: [{
      from: {
        [Op.between]: [createdAt, updatedAt]
      }
    }, {
      to: {
        [Op.between]: [createdAt, updatedAt]
      }
    }]
  }
  return db.Client.findAll({
    where
  })
}

module.exports = {
  getDashboardDetails,
  getDashboardClientCounts,
  getClientRevenueDetails
}
