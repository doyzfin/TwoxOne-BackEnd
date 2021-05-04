const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authModel = require('./auth_model')
const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
  register: async (req, res) => {
    try {
      const { userId, userEmail, userPassword, userName } = req.body

      // proses encrypt
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const checkEmailUser = await authModel.getDataCondition({
        user_email: userEmail
      })
      if (checkEmailUser.length > 0) {
        return helper.response(
          res,
          401,
          'Email is ON',
          checkEmailUser[0].user_email
        )
      } else {
        if (userName === 'admin') {
          const setData = {
            user_id: userId,
            user_name: userName,
            user_email: userEmail,
            user_password: encryptPassword,
            user_type: 'admin'
          }
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.USER_EMAIL, // generated ethereal user
              pass: process.env.USER_PASS // generated ethereal password
            }
          })

          const result = await authModel.register(setData)
          delete result.user_password
          const mailOption = {
            from: '"TwoxOne👻" <twoxonefwd@gmail.com>', // sender address
            to: `${userEmail}`, // list of receivers
            subject: 'TwoxOne Activation Account', // Subject line
            html: `<a href="http://localhost:3001/api/v1/auth/validate/${result.id}">Klik Disini</a>` // html body
          }
          await transporter.sendMail(mailOption, function (error, info) {
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          })
          return helper.response(res, 200, 'Success Register as Admin', result)
        } else {
          const setData = {
            user_name: userName,
            user_email: userEmail,
            user_password: encryptPassword,
            user_type: 'user'
          }
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.USER_EMAIL, // generated ethereal user
              pass: process.env.USER_PASS // generated ethereal password
            }
          })

          const result = await authModel.register(setData)
          delete result.user_password
          const mailOption = {
            from: '"TwoxOne👻" <twoxonefwd@gmail.com>', // sender address
            to: `${userEmail}`, // list of receivers
            subject: 'TwoxOne Activation Account', // Subject line
            html: `<a href="http://localhost:3001/api/v1/auth/validate/${result.id}">Klik Disini</a>` // html body
          }
          await transporter.sendMail(mailOption, function (error, info) {
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          })
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
