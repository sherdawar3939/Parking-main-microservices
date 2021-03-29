'use strict'
const db = require('../config/sequelize.config')
const generalHelper = require('./general.helper')
// fetch VehicleCategory
function createVoucherHelper (body, status) {
  return db.Client.findOne({ raw: true, where: { id: body.ClientId } })
    .then(async client => {
      if (client.type === 'Government') {
        body.uid = generalHelper.createUid(0, body.zip, status)
      } else if (client.type === 'Private') {
        await db.ParkingZone.findOne({ raw: true, where: { zip: body.zip, ClientId: body.ClientId } })
          .then(parkingZone => {
            if (!parkingZone) {
              return generalHelper.rejectPromise([{
                field: 'createVoucherHelper',
                error: 'HCVH-0001',
                message: 'First create parking zone'
              }])
            }
            body.uid = generalHelper.createUid(parkingZone.clientCount, body.zip, status)
          })
      }

      const foundVoucher = await db.Voucher.findOne({
        where: {
          uid: body.uid
        }
      })

      if (foundVoucher) {
        return generalHelper.rejectPromise([{
          field: 'general',
          error: 'HCVH-0005',
          message: 'This voucher already exist.'
        }])
      }

      return db.Voucher.create(body)
    }).then(async voucher => {
      const contractUid = await generalHelper.getUid('Contract', 'uid', {
        type: 'Voucher', ClientId: body.ClientId
      }, 'III')
      const filename = `${voucher.ClientId}-${contractUid}.pdf`
      const contract = {
        type: 'Voucher',
        status: 'APPROVED',
        uid: contractUid,
        contractUrl: filename,
        ClientId: voucher.ClientId,
        RefId: voucher.id
      }
      const contractData = {
        created: [],
        updated: [],
        deleted: []
      }

      const currentDate = new Date()
      contractData.created.push(`${voucher.uid} ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`)

      await generalHelper.generateVoucherContract(filename, JSON.parse(JSON.stringify(contractData.created)))
      contract.data = JSON.stringify(contractData)
      await db.Contract.create(contract)
    })
    .catch(generalHelper.catchException)
}

const getVoucherHelper = (conditions) => {
  const where = {}
  if (conditions.ClientId) {
    where.ClientId = conditions.ClientId
  }
  return db.Voucher.findAll({ where })
}

const getVoucherByIdHelper = (id) => {
  return db.Voucher.findOne({
    where: { id }
  })
}

function deleteVoucher (id) {
  return db.Voucher.findOne({
    where: {
      id
    },
    raw: true
  })
    .then((foundVoucher) => {
      if (!foundVoucher) {
        return false
      }

      db.Contract.findOne({
        where: {
          type: 'Voucher',
          ClientId: foundVoucher.ClientId,
          RefId: foundVoucher.id
        }
      })
        .then((foundContract) => {
          const currentDate = new Date()
          const contractData = JSON.parse(foundContract.dataValues.data)
          contractData.deleted.push(`${foundVoucher.uid} ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}\n`)

          generalHelper.generateVoucherContract(foundContract.dataValues.contractUrl, JSON.parse(JSON.stringify(contractData.created)), JSON.parse(JSON.stringify(contractData.updated)), JSON.parse(JSON.stringify(contractData.deleted)))
          foundContract.set({
            data: JSON.stringify(contractData)
          })
          return foundContract.save()
        })

      return db.Voucher.destroy({
        where: {
          id
        }
      })
    })
}

function updateSeasonalPass (id, data) {
  let previousValues
  return db.Voucher.findOne({ where: { id } })
    .then(async (voucher) => {
      if (!voucher) {
        return generalHelper.rejectPromise({
          field: 'id',
          error: 'voucher-0001',
          message: 'No Record Exist.'
        })
      }

      previousValues = JSON.parse(JSON.stringify(voucher))

      if (data.fee || (data.fee !== previousValues.fee)) {
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

        data.uid = feeString + zip
      }

      if (data.uid && data.uid !== previousValues.uid) {
        await db.Voucher.findOne({ where: { uid: data.uid } })
          .then((foundVoucher) => {
            if (foundVoucher) {
              return generalHelper.rejectPromise({
                field: 'id',
                error: 'voucher-0005',
                message: 'A voucher in this zip code already exist with this fee.'
              })
            }

            return db.Contract.findOne({
              where: {
                type: 'Voucher',
                ClientId: voucher.ClientId,
                RefId: voucher.id
              }
            })
          })
          .then((foundContract) => {
            const currentDate = new Date()
            const contractData = JSON.parse(foundContract.dataValues.data)
            contractData.updated.push(`${data.uid} ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}\n`)

            generalHelper.generateVoucherContract(foundContract.dataValues.contractUrl, JSON.parse(JSON.stringify(contractData.created)), JSON.parse(JSON.stringify(contractData.updated)))
            foundContract.set({
              data: JSON.stringify(contractData)
            })
            return foundContract.save()
          })
      }
      voucher.set(data)
      return voucher.save()
    })
    .catch(generalHelper.catchException)
}

module.exports = {
  createVoucherHelper,
  getVoucherHelper,
  getVoucherByIdHelper,
  deleteVoucher,
  updateSeasonalPass
}
