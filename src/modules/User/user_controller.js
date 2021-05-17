const redis = require('redis')
const client = redis.createClient()
const helper = require('../../helpers/wrapper')
const userModel = require('./user_model')
const bcrypt = require('bcrypt')
const fs = require('fs')
module.exports = {
  getData: async (req, res) => {
    try {
      const result = await userModel.getData()
      result.forEach((element) => {
        delete element.user_password
      })
      return helper.response(res, 200, 'Succees All Data User', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getDataUser: async (req, res) => {
    try {
      const { id } = req.params
      const result = await userModel.getAllData(id)
      if (result.length > 0) {
        client.set(`getUser:${id}`, JSON.stringify(result))
        return helper.response(res, 200, 'Success Get Data User', result)
      } else {
        return helper.response(res, 404, `Data Not Found by this ${id}`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateDataUser: async (req, res) => {
    try {
      const { id } = req.params
      // const { userName, userEmail, userPhone } = req.body
      const setData = {
        user_validate: true,
        user_created_at: new Date(Date.now()),
        user_updated_at: new Date(Date.now())
      }
      const getData = await userModel.getAllData(id)
      if (getData.length > 0) {
        const result = await userModel.updateData(setData, id)
        return helper.response(res, 200, 'Succes', result)
      } else {
        return helper.response(res, 404, 'Data Not Found ', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params
      const { userFirst, userLast, userEmail, userPhone } = req.body
      console.log(userFirst, userLast)
      const setData = {
        user_name: `${userFirst}` + ' ' + `${userLast}`,
        user_email: userEmail,
        user_phone: userPhone,
        user_image: req.file ? req.file.filename : '',
        user_created_at: new Date(Date.now()),
        user_updated_at: new Date(Date.now())
      }
      const getData = await userModel.getAllData(id)
      if (getData.length > 0) {
        const result = await userModel.updateProfile(setData, id)
        if (result.user_image !== req.file.filename) {
          return helper.response(
            res,
            200,
            `Succes Update Data By Id = ${id} `,
            result
          )
        } else {
          const src = `src/uploads/user/${getData[0].user_image}`
          if (fs.existsSync(src)) {
            fs.unlink(src, function (err) {
              if (err) throw err
              // if no error, file has been deleted successfully
              console.log('File deleted!')
            })
          }
          return helper.response(
            res,
            200,
            `Succes Update Data By Id = ${id}`,
            result
          )
        }
        // return helper.response(res, 200, 'Success Update Profile', result)
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { id } = req.params
      const { userPassword, confirmPassword } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptConfirmPassword = bcrypt.hashSync(confirmPassword, salt)
      // console.log(id, userPassword, confirmPassword)

      if (userPassword !== confirmPassword) {
        return helper.response(res, 400, 'Password Must Be Same as your Input')
      } else {
        const setData = {
          user_password: encryptConfirmPassword
        }
        const result = await userModel.updatePassword(setData, id)
        delete result.user_password
        return helper.response(res, 200, 'Success Update Password', result)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
