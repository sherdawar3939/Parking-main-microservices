'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalHelper = require('./general.helper')

const addParkingZone = (data) => {
  data.uid = data.maxTime.toString() + data.zip.toString() + data.fee.toString().split('.').join('')
  const center = generalHelper.getLatLonCenterFromGeometry(data.polygons[0])
  if (center) {
    data.lat = center.lat
    data.lng = center.lng
  }
  data.polygons = JSON.stringify(data.polygons)
  return db.ParkingZone.create(data)
    .then(async (createdParkingZone) => {
      if (!createdParkingZone) {
        return null
      }
      await db.ParkingZoneHolidays.bulkCreate(data.holidays)

      const contractUid = await generalHelper.getUid('Contract', 'uid', {
        type: 'ParkingZone'
      }, 'II')

      const contract = {
        type: 'ParkingZone',
        status: 'APPROVED',
        uid: contractUid,
        contractUrl: `${contractUid}.pdf`,
        ClientId: createdParkingZone.ClientId
      }

      const currentDate = new Date()

      const contractData = {
        created: [],
        updated: [],
        deleted: []
      }
      contractData.created.push(`${createdParkingZone.uid} ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`)

      await generalHelper.generateParkingZoneContract(contract.uid, JSON.parse(JSON.stringify(contractData.created)))
      contract.data = JSON.stringify(contractData)

      await db.Contract.create(contract)

      // If creative request quantity then add to system.
      if (data.creativesQuantity) {
        db.CreativeRequest.create({
          uid: await generalHelper.getUid('CreativeRequest', 'uid', {}, 'CR'),
          qty: data.creativesQuantity,
          ParkingZoneId: createdParkingZone.id,
          ClientId: createdParkingZone.ClientId
        })
      }
      return createdParkingZone
    })
    .catch(generalHelper.catchException)
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
