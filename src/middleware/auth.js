const helper = require('../helpers/wrapper')
const jwt = require('jsonwebtoken')

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization
    // console.log(token)
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          // const refreshedToken = jwt.sign(
          //   {
          //     success: true
          //   },
          //   'RAHASIA',
          //   {
          //     expiresIn: '1m'
          //   }
          // )
          // req.decodeToken = refreshedToken
          // next()
          return helper.response(res, 403, error.message)
        } else {
          req.decodeToken = result
          next()
        }
      })
    } else {
      return helper.response(res, 403, 'Please Login First !')
    }
  },
  isAdmin: (req, res, next) => {
    console.log('MiddleWare is Admin running')
    console.log(req.decodeToken)
    // tambah user_type di db
    // kondisi cek admin
    if (req.decodeToken.user_type !== 'admin') {
      return helper.response(res, 403, 'This only for Admin')
    } else {
      next()
    }
  }
}
