const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authModel = require('./auth_model')

module.exports = {
  register: async (req, res) => {
    try {
      const { userEmail, userPassword, userName } = req.body

      // proses encrypt
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)
      console.log(`before Encrypt = ${userPassword}`)
      console.log(`after Encrypt = ${encryptPassword}`)

      const checkEmailUser = await authModel.getDataCondition({
        user_email: userEmail
      })
      if (checkEmailUser.length > 0) {
        return helper.response(
          res,
          400,
          'Email is ON',
          checkEmailUser[0].user_email
        )
      } else {
        if (userEmail === 'admin' && userName === 'admin') {
          const setData = {
            user_name: userName,
            user_email: userEmail,
            user_password: encryptPassword,
            user_type: 'admin'
          }
          const result = await authModel.register(setData)
          delete result.user_password
          return helper.response(res, 200, 'Success Register as Admin', result)
        } else {
          const setData = {
            user_name: userName,
            user_email: userEmail,
            user_password: encryptPassword,
            user_type: 'user'
          }
          const result = await authModel.register(setData)
          delete result.user_password
          return helper.response(res, 200, 'Success Register', result)
        }
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkEmailUser = await authModel.getDataCondition({
        user_email: userEmail
      })
      // console.log(checkEmailUser)
      if (checkEmailUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmailUser[0].user_password
        )
        // console.log(checkPassword)
        if (checkPassword) {
          const payload = checkEmailUser[0]
          delete payload.user_password
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '24h'
          })
          const result = { ...payload, token }
          return helper.response(res, 200, 'Success Login', result)
        } else {
          return helper.response(res, 400, 'Wrong Password')
        }
      } else {
        return helper.response(res, 404, 'Email Not Registered')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
