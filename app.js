'use strict'

// Get dependencies
const express = require('express')
// const socket = require('socket.io')
const http = require('http')
const passport = require('./app/config/passport')
const app = express()
// Middleware to capture any HTTP responses

app.get('/main/api/v1/health', function (req, res) {
  return res.status(200).send('Admin micro-service working 100%... \n 1 September, 2020 - 12:00 AM')
})

app.get('/main/contract/:name', function (req, res) {
  var fs = require('fs')
  var data = fs.readFileSync('./contracts/' + req.params.name)
  res.contentType('application/pdf')
  res.send(data)
})

global.winston = require('./app/config/winston')

// Initialize Express
require('./app/config/express')(app, passport)

// Initializing socket io
// require('./app/config/socket.config')(app)

// Initializing sequelize
require('./app/config/sequelize.config')

// Initializing RabbitMQ Receiver on listening.
// require('./app/config/rabbitMQ.config')

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000'

app.set('port', port)
/**
 * Create HTTP server.
 */

const server = http.createServer(app)
// const io = socket.listen(server)

// require('./app/config/socket.config')(io)

/**
 * Listen on provided port, on all network interfaces.
 */
console.log('Going to listen on port:', port)
server.listen(port, () => console.log(`API running on localhost:${port}`)).on('error', (error) => {
  console.log(error)
})
console.log('After listen on port:', port)

module.exports = app
