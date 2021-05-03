const helper = require('../../helpers/wrapper')
const bookingModel = require('./booking_model')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  postBooking: async (req, res) => {
    try {
      const {
        premiereId,
        bookingTicket,
        bookingTotalPrice,
        bookingPaymentMethod,
        bookingStatus,
        bookingSeatLocation
      } = req.body

      const setData = {
        premiere_id: premiereId,
        booking_ticket: bookingTicket,
        booking_total_price: bookingTotalPrice,
        booking_payment_method: bookingPaymentMethod,
        booking_status: bookingStatus
      }
      const result = await bookingModel.postData(setData)
      console.log(result)

      bookingSeatLocation.forEach((element) => {
        const setDataSeat = {
          booking_id: result.id,
          booking_seat_location: element
        }
        console.log(setDataSeat)
        // eslint-disable-next-line no-unused-vars
        const resultSeat = bookingModel.postBookingSeat(setDataSeat)
      })
      return helper.response(res, 200, 'Succes Post Data Booking', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getBookingData: async (req, res) => {
    try {
      const result = await bookingModel.getDataBooking()
      client.setex(
        `getDataBooking:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify(result)
      )
      return helper.response(res, 200, 'Succes Get All Data Booking', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
