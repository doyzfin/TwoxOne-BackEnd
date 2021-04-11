const connection = require('../../config/mysql')
module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM location', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO location SET ?',
        setData,
        (error, result) => {
          !error
            ? resolve({ id: result.insertId, ...setData })
            : reject(new Error(error))
        }
      )
    })
  },
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE location SET ? WHERE location_id = ?',
        [setData, id],
        (error, result) => {
          !error ? resolve({ id: id, ...setData }) : reject(new Error(error))
        }
      )
    })
  },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM location WHERE location_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  searchbyName: (premiereName) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM location WHERE location_name LIKE ?',
        premiereName,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  sortbyName: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT *FROM location ORDER BY location_name ASC',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
