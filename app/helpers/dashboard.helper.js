'use strict'
// const _ = require('lodash')
// var Sequelize = require('sequelize')
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

const getDashboardClientCounts = async (id) => {
  const InspectorCountQuery = await db.Inspector.count({ where: { ClientId: id } })
  //   const ActiveParkingCountQuery = await db.Parking.count({ where: { ClientId: id } })P

  return { data: { InspectorCountQuery: InspectorCountQuery } }
}

module.exports = {
  getDashboardDetails,
  getDashboardClientCounts
}
