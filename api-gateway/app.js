const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const app = express()

app.use(logger('dev'))

// Middleware to prevent Cross-Origin Resource Sharing error
app.use(cors())


const TripRouter = require('./src/routes/TripRouter')


// Middleware router
app.use('/api/v1/trips', TripRouter)


module.exports = app