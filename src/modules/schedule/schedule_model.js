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
        'DELETE FROM schedule WHERE schedule.premiere_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM schedule WHERE schedule.premiere_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
