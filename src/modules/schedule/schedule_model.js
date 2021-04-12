const connection = require('../../config/mysql')

module.exports = {
  getData: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM schedule', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  createTime: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO schedule SET ?',
        setData,
        (error, result) => {
          !error
            ? resolve({ id: result.insertId, ...setData })
            : reject(new Error(error))
        }
      )
    })
  },
  updatedataTime: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE schedule SET ? WHERE schedule_id = ?',
        [setData, id],
        (error, result) => {
          !error ? resolve({ id: id, ...setData }) : reject(new Error(error))
        }
      )
    })
  },
  deletedataTime: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM schedule WHERE schedule_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  searchByTime: (searchTime) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM schedule WHERE schedule_time LIKE "%"?"%"',
        searchTime,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  sortByTime: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM schedule ORDER BY schedule_time ASC',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
