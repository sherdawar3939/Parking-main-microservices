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
  return db.Client.findAll({
    where,
    order: [
      ['id', 'ASC']
    ],
    // attributes: ['id', 'companyName', 'address', 'phone'],
    include: [{
      model: db.Contract,
      as: 'clientContracts',
      attributes: ['id', 'data', 'status']
    }]

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
const postClient = (body) => {
  return db.Client.create(body)
}

module.exports = {
  getClientList,
  getClientDetail,
  postClient
}
