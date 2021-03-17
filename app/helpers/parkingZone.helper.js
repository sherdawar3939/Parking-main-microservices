'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')

const addParkingZone = (data) => {
  data.uid = data.fee + data.maxTime + data.zip + Math.floor(Math.random() * (100 - 1 + 1) + 1)
  data.polygons = JSON.stringify(data.polygons)
  return db.ParkingZone.create(data)
}

function getparkingZone (conditions, limit, offset) {
  const where = {}
  const cityIdWhere = {}
  if (conditions.ClientId) {
    where.ClientId = conditions.ClientId
  }

  if (conditions.CityId) {
    cityIdWhere.CityId = conditions.CityId
  }
  if (conditions.search) {
    where[Op.or] = {
      days: {
        [Op.like]: '%' + conditions.search + '%'
      },
      zip: {
        [Op.like]: '%' + conditions.search + '%'
      },
      uid: {
        [Op.like]: '%' + conditions.search + '%'
      }

    }
  }

  return db.ParkingZone.findAndCountAll({
    where,
    order: [
      ['id', 'DESC']
    ],
    include: [
      {
        model: db.Client,
        as: 'parkingZoneClient'
      }
    ],
    limit: limit,
    offset: offset
  })
}

const getParkingZoneId = (id) => {
  return db.ParkingZone.findAll({
    where: {
      id
    },
    order: [
      ['id', 'ASC']
    ],
    include: [{
      attributes: ['id', 'companyName', 'email', 'address'],
      model: db.Client,
      as: 'parkingZoneClient'
    }, {
      model: db.CreativeRequest,
      as: 'parkingCreatives'
    }

    ]
  })
}

function updateParkingZone (id, data) {
  return db.ParkingZone.update(data, {
    where: {
      id
    }
  })
}
module.exports = {
  addParkingZone,
  getparkingZone,
  getParkingZoneId,
  updateParkingZone
}
