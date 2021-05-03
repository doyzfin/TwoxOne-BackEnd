const express = require('express')
const Route = express.Router()
const movieRouter = require('../modules/movie/movie_routes')
const locationRouter = require('../modules/location/location_routes')
const scheduleRouter = require('../modules/schedule/schedule_routes')
const bookingRouter = require('../modules/booking/booking_routes')
const premiereRouter = require('../modules/premiere/premiere_routes')
const authRouter = require('../modules/auth/auth_routes')
const userRouter = require('../modules/User/user_routes')

Route.use('/movie', movieRouter)
Route.use('/location', locationRouter)
Route.use('/schedule', scheduleRouter)
Route.use('/booking', bookingRouter)
Route.use('/premiere', premiereRouter)
Route.use('/auth', authRouter)
Route.use('/user', userRouter)

module.exports = Route
