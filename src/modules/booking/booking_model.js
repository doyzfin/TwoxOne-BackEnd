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
  },
  getChart: (loc, id, name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT MONTH(booking_created_at) AS month,SUM(booking_total_price) AS total,location.location_name AS loc, premiere.premiere_name AS name, premiere.movie_id AS movie FROM booking JOIN premiere ON booking.premiere_id = premiere.premiere_id JOIN location ON premiere.location_id = location.location_id WHERE YEAR(booking_created_at) = YEAR(NOW()) AND premiere.location_id = ? AND premiere.movie_id =  ? AND premiere.premiere_name LIKE '%${name}%' GROUP BY MONTH(booking_created_at)`,
        [loc, id, name],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getChartDefault: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT MONTH(booking_created_at) AS month,SUM(booking_total_price) AS total  FROM booking  WHERE YEAR(booking_created_at) = YEAR(NOW())  GROUP BY MONTH(booking_created_at)',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getChartMovie: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT MONTH(booking_created_at) AS month,SUM(booking_total_price) AS total,premiere.movie_id AS movie FROM booking JOIN premiere ON booking.premiere_id = premiere.premiere_id WHERE YEAR(booking_created_at) = YEAR(NOW()) AND premiere.movie_id = ?  GROUP BY MONTH(booking_created_at)',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getChartPremiere: (name) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT MONTH(booking_created_at) AS month,SUM(booking_total_price) AS total, premiere.premiere_name AS name  FROM booking JOIN premiere ON booking.premiere_id = premiere.premiere_id WHERE YEAR(booking_created_at) = YEAR(NOW())  AND premiere.premiere_name LIKE "%${name}%" GROUP BY MONTH(booking_created_at)`,
        name,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getChartLocation: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT MONTH(booking_created_at) AS month,SUM(booking_total_price) AS total,location.location_name AS loc FROM booking JOIN premiere ON booking.premiere_id = premiere.premiere_id JOIN location ON premiere.location_id = location.location_id WHERE YEAR(booking_created_at) = YEAR(NOW()) AND premiere.location_id = 10 GROUP BY MONTH(booking_created_at)',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
