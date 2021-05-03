const redis = require('redis')
const client = redis.createClient()
const helper = require('../../helpers/wrapper')
const userModel = require('./user_model')
module.exports = {
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
        return helper.response(
          res,
          200,
          `Succes Update Data By Id = ${id} And Img`,
          result
        )
      } else {
        return helper.response(res, 404, `Data Not Found By Id = ${id}`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
