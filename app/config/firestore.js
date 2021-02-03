'use strict'
const admin = require('firebase-admin')

var serviceAccount = require('../../zaqoota-a0053-ff2c3498ad84.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
module.exports = {
  db: db
}
