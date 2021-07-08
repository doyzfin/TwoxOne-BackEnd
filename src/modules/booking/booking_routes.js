const express = require('express')
const Route = express.Router()

const bookingController = require('./booking_controller')
const authMiddleware = require('../../middleware/auth')
const redisMiddleware = require('../../middleware/redis')

Route.get('/hello', bookingController.sayHello)
Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  bookingController.postBooking
)
Route.get(
  '/',
  authMiddleware.authentication,
  redisMiddleware.getDataBooking,
  bookingController.getBookingData
)
Route.get(
  '/chart',
  authMiddleware.authentication,
  bookingController.getDataChart
)

module.exports = Route
