const helper = require('../../helpers/wrapper')
const bookingModel = require('./booking_model')

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
        bookingStatus
      } = req.body
      const setData = {
        premiere_id: premiereId,
        booking_ticket: bookingTicket,
        booking_total_price: bookingTotalPrice,
        booking_payment_method: bookingPaymentMethod,
        booking_status: bookingStatus
      }
      const result = await bookingModel.postData(setData)
      return helper.response(res, 200, 'Succes Post Data Booking', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getBookingData: async (req, res) => {
    try {
      const result = await bookingModel.getDataBooking()
      return helper.response(res, 200, 'Succes Get All Data Booking', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
