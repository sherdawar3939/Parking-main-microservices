'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
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
  //     [Sequelize.fn('count', Sequelize.fn('DISTINCT', Sequelize.col('clientzipcodes.ClientId'))), 'count_of_actions']
  //     [Sequelize.fn('count', Sequelize.fn('DISTINCT', Sequelize.col('clientParkingZones.ClientId'))), 'count_of_comments']
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
  //     }],
  //   group: ['client.id']
  //   order: ['client.id', 'ASC']
  // })
  return db.Client.findAll({
    where,
    order: [
      ['id', 'ASC']
    ]
    // attributes: ['id', 'companyName', 'address'],
    // include: [{
    //   model: db.ClientZipCode,
    //   as: 'clientZipCodes',
    //   attributes: [[Sequelize.fn('COUNT', Sequelize.col('clientzipcodes.ClientId')), 'ZipCodeCount']],
    //   where: {
    //     isDeleted: false
    //   }

    // },
    // {
    //   model: db.ParkingZone,
    //   as: 'clientParkingZones',
    //   attributes: [[Sequelize.fn('COUNT', Sequelize.col('clientParkingZones.ClientId')), 'ZoneCount']]

    // }
    // ],
    // group: ['id']

  })
}
const getClientDetail = (id) => {
  return db.Client.findAll({

    where: {
      id
    },
    order: [
      ['id', 'ASC']
    ],
    attributes: ['id', 'companyName', 'email', 'phone', 'iban', 'secondaryPhone', 'secondaryEmail', 'secondaryContactPersonName', 'address'],
    include: [{
      model: db.ClientZipCode,
      as: 'clientZipCodes',
      attributes: ['clientId'],
      where: {
        isDeleted: false
      },
      include: [{
        model: db.ZipCode,
        as: 'zipCodes',
        attributes: ['zipCode'],
        include: [{
          model: db.City,
          as: 'cityZipCodes',
          attributes: ['name'],
          include: [{
            model: db.Country,
            as: 'countryCities',
            attributes: ['name']
          }]

        }]
      }]
    }, {
      model: db.Payment,
      as: 'clientPayments',
      attributes: ['amount']
    }, {
      model: db.ParkingZone,
      as: 'clientParkingZones',
      attributes: ['days']
    }
    ]

  })
}
module.exports = {
  getClientList,
  getClientDetail
}
