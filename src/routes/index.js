const express = require('express')
const Route = express.Router()
const movieRouter = require('../modules/movie/movie_routes')
const locationRouter = require('../modules/location/location_routes')
const scheduleRouter = require('../modules/schedule/schedule_routes')
const bookingRouter = require('../modules/booking/booking_routes')

Route.use('/movie', movieRouter)
Route.use('/location', locationRouter)
Route.use('/schedule', scheduleRouter)
Route.use('/booking', bookingRouter)

module.exports = Route
