const express = require('express')
const router = express.Router()
const { getTrips } = require('../controller/TripController')

// Base get routing
router.get('/', getTrips)

module.exports = router