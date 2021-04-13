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
  // createDataMovie: (setDataM) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query('INSERT INTO movie SET ?', setDataM, (error, result) => {
  //       !error
  //         ? resolve({ id: result.insertId, ...setDataM })
  //         : reject(new Error(error))
  //     })
  //   })
  // },
  getAllData: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM premiere', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
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
