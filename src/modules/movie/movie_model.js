const connection = require('../../config/mysql')

module.exports = {
  getDataAll: (search, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM movie WHERE movie_name LIKE "%"?"%" ORDER BY ? LIMIT ? OFFSET ? ',
        [search, sort, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total  FROM movie',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM movie WHERE movie_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO movie SET ?', setData, (error, result) => {
        // !error ? resolve({id:result.insertId,...setData}) : reject(new Error(error))
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE movie SET ? WHERE movie_id = ?',
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
        'DELETE FROM movie  WHERE movie_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
  // searchName: (movieName) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       'SELECT * FROM movie WHERE movie_name  LIKE "%"?"%"',
  //       movieName,
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  // sorting: () => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       'SELECT * FROM movie ORDER BY movie_name,movie_release_date ASC;',
  //       (error, result) => {
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // }
}
