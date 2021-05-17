const connection = require('../../config/mysql')
module.exports = {
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO premiere SET ?',
        setData,
        (error, result) => {
          !error
            ? resolve({ id: result.insertId, ...setData })
            : reject(new Error(error))
        }
      )
    })
  },
  getAllData: (search, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM premiere WHERE premiere_name LIKE "%"?"%" ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [search, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataDB: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT schedule.schedule_date_start,schedule.schedule_date_end,schedule.schedule_time,premiere.premiere_id,premiere.movie_id,movie.movie_name,premiere.location_id,location.location_address,location.location_name,premiere.premiere_name,premiere.premiere_price FROM schedule INNER JOIN premiere ON schedule.premiere_id = premiere.premiere_id INNER JOIN movie ON premiere.movie_id = movie.movie_id INNER JOIN location ON premiere.location_id = location.location_id',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataDBId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM premiere WHERE movie_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total  FROM premiere',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM premiere WHERE premiere_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  updatePremiere: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE premiere SET ? WHERE premiere_id = ?',
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
        'DELETE FROM premiere WHERE premiere_id =?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
