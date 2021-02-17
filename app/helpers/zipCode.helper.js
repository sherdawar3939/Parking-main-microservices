const db = require('../config/sequelize.config');

//Get Zip Code
function getZipCode(conditions) {
    return db.ZipCode.findAll({
        where: conditions
    })
}
module.exports = {
    getZipCode
}