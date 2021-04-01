'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalHelper = require('./general.helper')

const addParkingZone = (data) => {
  let feeNumber = data.fee
  let feeString = ''
  if (feeNumber < 0) {
    feeNumber = (Math.round(feeNumber * 100) / 100).toFixed(1)
    feeString = feeNumber.toString().split('.').join('')
  } else {
    feeNumber = (Math.round(feeNumber * 100) / 100).toFixed(1)
    feeString = feeNumber.toString().split('.').join('')
  }
  if (feeString.length < 2) {
    feeString = feeString + '0'
  }

  data.uid = data.maxTime.toString() + feeString + data.zip.toString()
  const center = generalHelper.getLatLonCenterFromGeometry(data.polygons[0])
  if (center) {
    data.lat = center.lat
    data.lng = center.lng
  }
  data.polygons = JSON.stringify(data.polygons)
  return db.ParkingZone.findOne({ where: { zip: data.zip, ClientId: data.ClientId, CityId: data.CityId } })
    .then(parking => {
      if (parking) {
        return generalHelper.rejectPromise([{
          field: 'clientCount',
          error: 'HAPZ-005',
          message: 'This user already Created parkingZone'
        }])
      }
      return db.Client.findOne({ raw: true, where: { id: data.ClientId } })
    })
    .then(async client => {
      if (client.type === 'Government') {
        const parkingZone = await db.ParkingZone.findOne({ where: { zip: data.zip, clientCount: 0, CityId: data.CityId } })
        if (!parkingZone) {
          data.clientCount = 0
        } else {
          return generalHelper.rejectPromise([{
            field: 'clientCount',
            error: 'HAPZ-010',
            message: 'already created parkingZone for govt'
          }])
        }
      } else if (client.type === 'Private') {
        const parkingZone = await db.ParkingZone.findAll({
          where: {
            zip: data.zip,
            clientCount: {
              [Op.ne]: 0
            },
            CityId: data.CityId
          },
          order: [
            ['clientCount', 'ASC']
          ]
        })
        if (parkingZone.length < 1) {
          data.clientCount = 9
        } else if (parkingZone[0].dataValues.clientCount > 5) {
          data.clientCount = (parkingZone[0].dataValues.clientCount - 1)
        } else {
          return generalHelper.rejectPromise([{
            field: 'clientCount',
            error: 'HAPZ-015',
            message: 'You are not created parkingZone'
          }])
        }
      }

      return db.ParkingZone.create(data)
    }).then(async (createdParkingZone) => {
      if (!createdParkingZone) {
        return null
      }

      if (data.holidays) {
        const holidaysToInsert = []
        data.holidays.forEach(holiday => {
          holidaysToInsert.push({
            holidayDate: new Date(holiday),
            ParkingZoneId: createdParkingZone.id
          })
        })
        db.ParkingZoneHoliday.bulkCreate(holidaysToInsert)
      }

      const contractUid = await generalHelper.getUid('Contract', 'uid', {
        type: 'ParkingZone',
        ClientId: data.ClientId
      }, 'II')
      const fileName = `${data.ClientId}-${contractUid}.pdf`
      const contract = {
        type: 'ParkingZone',
        status: 'APPROVED',
        uid: contractUid,
        contractUrl: fileName,
        ClientId: createdParkingZone.ClientId,
        RefId: createdParkingZone.id
      }

      const contractData = {
        created: [],
        updated: [],
        deleted: []
      }
      const currentDate = new Date()
      contractData.created.push(`${createdParkingZone.uid} ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`)

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
  if (conditions.ClientId) {
    where.ClientId = conditions.ClientId
  }

  if (conditions.CityId) {
    where.CityId = conditions.CityId
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

  return db.ParkingZone.findAndCountAll({
    where,
    order: [
      ['id', 'DESC']
    ],
    include: [{
      model: db.Client,
      as: 'parkingZoneClient'
    }],
    limit: limit,
    offset: offset
  })
}

const getParkingZoneId = (id) => {
  return db.ParkingZone.findOne({
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
    }, {
      model: db.ParkingZoneHoliday,
      as: 'parkingHolidays'
    }]
  })
}

function updateParkingZone (id, data) {
  let previousValues
  return db.ParkingZone.findOne({ where: { id } })
    .then(async (parkingZone) => {
      if (!parkingZone) {
        return generalHelper.rejectPromise({
          field: 'id',
          error: 'PZUP-0001',
          message: 'No Record Exist.'
        })
      }

      previousValues = JSON.parse(JSON.stringify(parkingZone))

      if (data.fee || data.maxTime || (data.fee !== previousValues.fee) || (data.maxTime !== previousValues.maxTime)) {
        let maxTime = data.maxTime.toString() || previousValues.maxTime.toString()

        let feeNumber = data.fee || previousValues.fee
        let feeString = ''
        if (feeNumber < 0) {
          feeNumber = (Math.round(feeNumber * 100) / 100).toFixed(1)
          feeString = feeNumber.toString().split('.').join('')
        } else {
          feeNumber = (Math.round(feeNumber * 100) / 100).toFixed(1)
          feeString = feeNumber.toString().split('.').join('')
        }
        if (feeString.length < 2) {
          feeString = feeString + '0'
        }
        let zip = previousValues.zip.toString()

        data.uid = maxTime + feeString + zip
      }

      if (data.uid && data.uid !== previousValues.uid) {
        await db.ParkingZone.findOne({ where: { uid: data.uid } })
          .then((foundZone) => {
            if (foundZone) {
              return generalHelper.rejectPromise({
                field: 'id',
                error: 'PZUP-0005',
                message: 'A parking zone in this zip code already exist with this fee and max time.'
              })
            }

            return db.Contract.findOne({
              where: {
                type: 'ParkingZone',
                ClientId: parkingZone.ClientId,
                RefId: parkingZone.id
              }
            })
          })
          .then((foundContract) => {
            const currentDate = new Date()
            const contractData = JSON.parse(foundContract.dataValues.data)
            contractData.updated.push(`${data.uid} ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}\n`)

            generalHelper.generateParkingZoneContract(foundContract.dataValues.contractUrl, JSON.parse(JSON.stringify(contractData.created)), JSON.parse(JSON.stringify(contractData.updated)))
            foundContract.set({
              data: JSON.stringify(contractData)
            })
            return foundContract.save()
          })
      }
      parkingZone.set(data)
      return parkingZone.save()
    })
    .catch(generalHelper.catchException)
}

function deleteParkingZone (id) {
  return db.ParkingZone.findOne({
    where: {
      id
    },
    raw: true
  })
    .then((foundParkingZone) => {
      if (!foundParkingZone) {
        return false
      }

      db.Contract.findOne({
        where: {
          type: 'ParkingZone',
          ClientId: foundParkingZone.ClientId,
          RefId: foundParkingZone.id
        }
      })
        .then((foundContract) => {
          const currentDate = new Date()
          const contractData = JSON.parse(foundContract.dataValues.data)
          contractData.deleted.push(`${foundParkingZone.uid} ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}\n`)

          generalHelper.generateParkingZoneContract(foundContract.dataValues.contractUrl, JSON.parse(JSON.stringify(contractData.created)), JSON.parse(JSON.stringify(contractData.updated)), JSON.parse(JSON.stringify(contractData.deleted)))
          foundContract.set({
            data: JSON.stringify(contractData)
          })
          return foundContract.save()
        })

      return db.ParkingZone.destroy({
        where: {
          id
        }
      })
    })
}

module.exports = {
  addParkingZone,
  getparkingZone,
  getParkingZoneId,
  updateParkingZone,
  deleteParkingZone
}
