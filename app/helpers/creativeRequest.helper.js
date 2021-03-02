'use strict'

var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
<<<<<<< HEAD
    // const _ = require('lodash')

/** Create Creative Requests */
function createRequest(data) {
    return db.CreativeRequest.findOne()
        .then((result) => {
            let foundUid = result.uid

            data.uid = foundUid + 1

            return db.createRequest.create(data)
        })
=======
const generalHelper = require('./general.helper')

/** Create Creative Requests */
const createRequest = async (data) => {
  data.uid = await generalHelper.getUid('CreativeRequest', 'uid', {}, 'CR')
  return db.CreativeRequest.create(data)
>>>>>>> dev
}

function getCreatives(id) {
    return db.Contract.findOne({
        where: {
            id
        },
        include: [{
            model: db.Client,
            as: 'clientContracts',
            include: [{
                model: db.ParkingZone,
                as: 'clientParkingZones'
            }]
        }]

    })
}

/** Fetch Creative Request List */
function getRequestList(conditions, limit, offset) {
    const where = {}

    if (conditions.ClientId) {
        where.ClientId = conditions.ClientId
    }

    if (conditions.status) {
        where.status = conditions.status
    }
    if (conditions.search) {
        where[Op.or] = {
            uid: {
                [Op.like]: '%' + conditions.search + '%'
            },
            status: {
                [Op.like]: '%' + conditions.search + '%'
            },
            qty: {
                [Op.like]: '%' + conditions.search + '%'
            }
        }
    }

    return db.CreativeRequest.findAndCountAll({
        where,
        limit: limit,
        offset: offset,
        include: [{
            model: db.Client,
            as: 'creativeRequestClient'
        }]
    })
}

const updateCreativeRequest = (id, data) => {
  return db.CreativeRequest.update(data, {
    where: {
      id
    }
  })
}

module.exports = {
<<<<<<< HEAD
    createRequest,
    getRequestList,
    getCreatives
}
=======
  createRequest,
  getRequestList,
  getCreatives,
  updateCreativeRequest
}
>>>>>>> dev
