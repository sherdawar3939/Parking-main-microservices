'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalHelper = require('./general.helper')

const addParkingZone = (data) => {
  data.uid = data.maxTime.toString() + data.fee.toString().split('.').join('') + data.zip.toString()
  const center = generalHelper.getLatLonCenterFromGeometry(data.polygons[0])
  if (center) {
    data.lat = center.lat
    data.lng = center.lng
  }
  data.polygons = JSON.stringify(data.polygons)
  return db.ParkingZone.findOne({ where: { zip: data.zip, ClientId: data.ClientId } })
    .then(parking => {
      if (parking) {
        return generalHelper.rejectPromise([{
          field: 'clientCount',
          error: 1540,
          message: 'This user already Created parkingZone'
        }])
      }
      return parking
    }).then(parking => {
      if (!parking) {
        return db.Client.findOne({ raw: true, where: { id: data.ClientId } })
      }
    }).then(async client => {
      if (client.type === 'Government') {
        const parkingZone = await db.ParkingZone.findOne({ where: { zip: data.zip, clientCount: 0 } })
        if (!parkingZone) {
          data.clientCount = 0
        }
        return generalHelper.rejectPromise([{
          field: 'clientCount',
          error: 1540,
          message: 'already created parkingZone '
        }])
      } else if (client.type === 'Private') {
        const parkingZone = await db.ParkingZone.findAll({
          where: { zip: data.zip, clientCount: { [Op.ne]: 0 } },
          order: [ ['clientCount', 'ASC'] ]
        })
        if (parkingZone.length < 1) {
          data.clientCount = 9
        } else if (parkingZone[0].dataValues.clientCount > 5) {
          data.clientCount = (parkingZone[0].dataValues.clientCount - 1)
        } else {
          return generalHelper.rejectPromise([{
            field: 'clientCount',
            error: 1540,
            message: 'You are not created parkingZone'
          }])
        }
      }

      return db.ParkingZone.create(data)
    }).then(async (createdParkingZone) => {
      if (!createdParkingZone) {
        return null
      }
      console.log(createdParkingZone)
      await db.ParkingZoneHolidays.bulkCreate(data.holidays, { ParkingZoneId: createdParkingZone.id })

      const contractUid = await generalHelper.getUid('Contract', 'uid', {
        ClientId: data.ClientId
      }, 'II')

      const contract = {
        type: 'ParkingZone',
        status: 'APPROVED',
        uid: contractUid,
        contractUrl: `${data.ClientId}${contractUid}.pdf`,
        ClientId: createdParkingZone.ClientId
      }

      const currentDate = new Date()

      const contractData = {
        created: [],
        updated: [],
        deleted: []
      }
      contractData.created.push(`${createdParkingZone.uid} ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`)
      const fileName = `${data.ClientId}${contract.uid}`
      await generalHelper.generateParkingZoneContract(fileName, JSON.parse(JSON.stringify(contractData.created)))
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

  if (conditions.status) {
    where.status = conditions.status
  }

  if (conditions.activeAfter) {
    where.activeAfter = {
      [Op.lt]: new Date()
    }
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

  console.log(where)

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
