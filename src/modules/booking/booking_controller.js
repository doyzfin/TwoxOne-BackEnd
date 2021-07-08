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

      bookingSeatLocation.forEach((element) => {
        const setDataSeat = {
          booking_id: result.id,
          booking_seat_location: element
        }

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
  },
  getDataChart: async (req, res) => {
    try {
      const { movieId, premiereName, locationId } = req.query
      if (premiereName && movieId && locationId) {
        const result = await bookingModel.getChart(
          locationId,
          movieId,
          premiereName
        )
        return helper.response(res, 200, 'Succes Get Chart Booking All', result)
      }

      if (movieId === '') {
        const result = await bookingModel.getChartDefault()
        return helper.response(res, 200, 'Succes Get Chart Booking 1', result)
      } else if (movieId) {
        const result = await bookingModel.getChartMovie(movieId)
        return helper.response(
          res,
          200,
          `Succes Get Chart Booking Movie by id ${movieId}`,
          result
        )
      }
      if (premiereName === '') {
        const result = await bookingModel.getChartDefault()
        return helper.response(res, 200, 'Succes Get Chart Booking All', result)
      } else if (premiereName) {
        const result = await bookingModel.getChartPremiere(premiereName)
        return helper.response(
          res,
          200,
          `Succes Get Chart Booking Premiere by name = ${premiereName}`,
          result
        )
      }
      if (locationId === '') {
        const result = await bookingModel.getChartDefault()
        return helper.response(res, 200, 'Succes Get Chart Booking All', result)
      } else if (locationId) {
        const result = await bookingModel.getChartLocation(locationId)
        return helper.response(
          res,
          200,
          `Succes Get Chart Booking Location by id = ${locationId}`,
          result
        )
      }
      if (
        premiereName === undefined ||
        movieId === undefined ||
        locationId === undefined
      ) {
        const result = await bookingModel.getChartDefault()
        return helper.response(
          res,
          200,
          'Succes Get Chart Booking Default',
          result
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
