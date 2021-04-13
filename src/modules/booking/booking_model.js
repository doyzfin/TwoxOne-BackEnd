const connection = require('../../config/mysql')

module.exports = {
  postData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO booking SET ?',
        setData,
        (error, result) => {
          !error
            ? resolve({ id: result.insertId, ...setData })
            : reject(new Error(error))
        }
      )
    })
  },
  postBookingSeat: (setDataSeat) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO booking_seat SET ?',
        setDataSeat,
        (error, result) => {
          !error
            ? resolve({ id: result.insertId, ...setDataSeat })
            : reject(new Error(error))
        }
      )
    })
  },
  getDataBooking: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT booking.booking_id,booking.premiere_id,booking.booking_ticket,booking.booking_total_price,booking.booking_payment_method,booking.booking_status, booking_seat.booking_seat_location,booking.booking_created_at,booking.booking_updated_at  FROM `booking` JOIN `booking_seat` ON booking.booking_id = booking_seat.booking_id',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
