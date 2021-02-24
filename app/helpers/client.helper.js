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
  //     [Sequelize.fn('count', Sequelize.col('clientZipCodes.ClientId')), 'zipCodeCount'],
  //     [Sequelize.fn('count', Sequelize.col('clientParkingZones.ClientZipCodeId')), 'parkingZoneCount']
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
  //   group: ['id']
  // })
  return db.Client.findAll({
    where,
    order: [
      ['id', 'ASC']
    ],
    attributes: ['id', 'companyName', 'address']
    // include: [{
    //   model: db.ClientZipCode,
    //   as: 'clientZipCodes',
    //   attributes: [[Sequelize.fn('COUNT', Sequelize.col('clientZipCodes.ClientId')), 'ZipCodeCount']],
    //   where: {
    //     isDeleted: false
    //   }

    // },
    // {
    //   model: db.ParkingZone,
    //   as: 'clientParkingZones',
    //   attributes: [[Sequelize.fn('COUNT', Sequelize.col('clientParkingZones.ClientZipCodeId')), 'ZoneCount']]

    // }
    // ],
    // group: ['id']

  })
}
const getClientDetail = (id) => {
  return db.Client.findOne({

    where: {
      id
    },
    attributes: ['id', 'companyName', 'email', 'phone', 'iban', 'secondaryPhone', 'secondaryEmail', 'secondaryContactPersonName', 'address', 'balance'],
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
      model: db.ParkingZone,
      as: 'clientParkingZones'
    }
    ]

  })
}
module.exports = {
  getClientList,
  getClientDetail
}
