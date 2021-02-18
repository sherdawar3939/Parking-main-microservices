'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('./general.helper')
const { groupBy } = require('lodash')

const getClientList = (conditions) => {
  const where = {}

  if (conditions.zipcode) {
    where.zipcode = conditions.zipcode
  }

  if (conditions.status) {
    where.status = conditions.status
  }

  if (conditions.search) {
    where[[Op.or]] = {
      companyName: {
        [Op.like]: '%' + conditions.search + '%'
      }
    }
  }
  // return db.Client.findAndCountAll({
  //   attributes: ['id', 'companyName', 'address',
  //     // [Sequelize.fn('count', Sequelize.fn('DISTINCT', Sequelize.col('clientzipcodes.ClientId'))), 'count_of_actions'],
  //     [Sequelize.fn('count', Sequelize.fn('DISTINCT', Sequelize.col('parkingzones.ClientId'))), 'count_of_comments']
  //   ],
  //   include: [
  //     {
  //       attributes: [],
  //       model: db.ClientZipCode,
  //       as: 'clientZipCodes'
  //     },
  //     {
  //       attributes: [],
  //       model: db.ParkingZone,
  //       as: 'clientParkingZones'
  //     }]
  //   // group: ['clients.id'],
  //   // order: ['clients.id', 'ASC']
  // })
  return db.Client.findAll({
    where,
    order: [
      ['id', 'ASC']
    ],
    attributes: ['id', 'companyName', 'address', [Sequelize.fn('COUNT', Sequelize.col('ClientId')), 'ZipCodeCount']],
    include: [{
      model: db.ClientZipCode,
      // attributes: [],
      as: 'clientZipCodes',
      // attributes: {
      //   include: [[Sequelize.fn('COUNT', Sequelize.col('ClientId')), 'ZipCodeCount']]
      // },
      where: {
        isDeleted: false
      }

    },
    {
      model: db.ParkingZone,
      as: 'clientParkingZones',
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('ClientId')), 'Count']]
      }
    }

    ],
    group: ['id']
    // {
    //   model: db.ParkingZone,
    //   as: 'clientParkingZones'

    // }]

    // }, {
    //   model: db.ParkingZone,
    //   // attributes: [],
    //   as: 'clientParkingZones'
    //   // attributes:
    //   //     [[Sequelize.fn('COUNT', Sequelize.col('parkingzones.ClientId')), 'ParkingZoneCount']]
    // }],
    // group: ['ClientId']
  })
}
module.exports = {
  getClientList
}
