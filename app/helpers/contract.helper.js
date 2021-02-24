'use strict'
const db = require('../config/sequelize.config')

function addContract(data) {
    return db.Contract.create(data)
}

function getContractList(conditions, limit, offset) {
    return db.Contract.findAll({
        where: conditions,
        nest: false,
        raw: true,
        include: {
            model: db.Client,
            as: 'clientContract'
        },
        limit: limit,
        offset: offset
    })
}

function verifyContract(id) {
    return db.Contract.update({ status: 'APPROVED' }, { where: id })
}
module.exports = {
    addContract,
    getContractList,
    verifyContract
}