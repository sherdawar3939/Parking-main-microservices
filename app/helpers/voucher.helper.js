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
module.exports = {
  createVoucherHelper,
  getVoucherHelper,
  getVoucherByIdHelper
}
