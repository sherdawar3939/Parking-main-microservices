var Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

const createInspector = (userData) => {
    return db.User.findOne({
            where: {
                [Op.or]: [{ email: userData.email }]
            }
        })
        .then((user) => {
            if (user) {
                return generalHelpingMethods.rejectPromise({
                    field: 'email',
                    error: 3456,
                    message: 'Email already exist.'
                })
            }
            return db.User.create(userData)
        })
        .then((user) => {
            return db.Inspector.create({ UserId: user.id })
        })
}

const updateInspector = (id, data) => {
    return db.Inspector.findOne({ where: { id } })
        .then((foundInspector) => {
            if (!foundInspector) {
                return generalHelpingMethods.rejectPromise({
                    field: 'id',
                    error: 3456,
                    message: 'No Record Exists.'
                })
            }

            return db.User.update(data, {
                where: {
                    id: foundInspector.UserId
                }
            })
        })
}

function deleteInspector(id) {
    return db.Inspector.findOne({ where: { id } })
        .then((foundInspector) => {
            if (!foundInspector) {
                return generalHelpingMethods.rejectPromise({
                    field: 'id',
                    error: 3456,
                    message: 'No Record Exists.'
                })
            }

            return db.User.update({ isDeleted: true }, {
                where: {
                    id: foundInspector.UserId
                }
            })
        })
}

function getInspector(id) {
    return db.Inspector.findAll({
        where: {
            id
        },
        include: [{
            model: db.User,
            as: 'userInspector',
            attributes: ['fName', 'lName', 'email', 'isVerified', 'isBlocked', 'isDeleted', 'createdAt', 'updatedAt', 'roleId'],
            where: { isDeleted: false }
        }]
    })
}

function getInspectorList(conditions, limit, offset) {
    const where = {}

    if (conditions.search) {
        where[Op.or] = {
            fName: {
                [Op.like]: '%' + conditions.search + '%'
            },
            lName: {
                [Op.like]: '%' + conditions.search + '%'
            },
            email: {
                [Op.like]: '%' + conditions.search + '%'
            }
        }
    }

    return db.Inspector.findAll({
        where,
        limit: limit,
        offset: offset,
        include: [{
            model: db.User,
            as: 'userInspector',
            attributes: ['fName', 'lName', 'email', 'isVerified', 'isBlocked', 'isDeleted', 'createdAt', 'updatedAt', 'roleId'],
            where: { isDeleted: false }
        }]
    })
}
module.exports = { createInspector, updateInspector, deleteInspector, getInspector, getInspectorList }