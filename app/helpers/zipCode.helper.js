const db = require('../config/sequelize.config')

// Get Zip Code
function getZipCode (conditions) {
  return db.ZipCode.findAll({
    where: conditions
  })
}
const getZipCodeByCityIdHelper = (id) => {
  return db.ZipCode.findAll({
    where: {
      CityId: id
    }
  })
}
module.exports = {
  getZipCode,
  getZipCodeByCityIdHelper
}
