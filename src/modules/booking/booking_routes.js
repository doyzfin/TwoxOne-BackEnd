const express = require('express')
const Route = express.Router()

const bookingController = require('./booking_controller')

Route.get('/hello', bookingController.sayHello)
Route.post('/', bookingController.postBooking)
Route.get('/', bookingController.getBookingData)

module.exports = Route
