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
  getDataBooking: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM booking', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
