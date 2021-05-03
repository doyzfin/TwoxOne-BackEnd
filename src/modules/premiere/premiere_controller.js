const helper = require('../../helpers/wrapper')
const redis = require('redis')
const client = redis.createClient()

const premiereModel = require('./premiere_model')
module.exports = {
  postPremiereData: async (req, res) => {
    try {
      const { locationId, movieId, premiereName, premierePrice } = req.body
      console.log(req.body)
      const setData = {
        location_id: locationId,
        movie_id: movieId,
        premiere_name: premiereName,
        premiere_price: premierePrice
      }
      const result = await premiereModel.createData(setData)
      return helper.response(res, 200, 'Succes Post Movie', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllDataDB: async (req, res) => {
    try {
      const result = await premiereModel.getDataDB()
      client.setex(
        `getpremiereAllDB:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result })
      )
      return helper.response(res, 200, 'Succes ', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getPremiereData: async (req, res) => {
    try {
      let { search, page, limit, sort } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      if (!sort) {
        sort = 'premiere_id ASC'
      }
      if (!search) {
        search = ''
      }
      if (!limit) {
        limit = 10
      }
      if (!page) {
        page = 1
      }
      const totalData = await premiereModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await premiereModel.getAllData(search, sort, limit, offset)
      client.setex(
        `getpremiere:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      )
      // const result = await premiereModel.getAllData()
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data Premiere', [
          result,
          pageInfo
        ])
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updatePremiereData: async (req, res) => {
    try {
      const { id } = req.params
      const { locationId, movieId, premiereName, premierePrice } = req.body
      const setData = {
        location_id: locationId,
        movie_id: movieId,
        premiere_name: premiereName,
        premiere_price: premierePrice
      }
      const getDataId = await premiereModel.getId(id)
      if (getDataId.length > 0) {
        const result = await premiereModel.updatePremiere(setData, id)
        return helper.response(res, 200, 'Success Update Premiere', result)
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletePremiereData: async (req, res) => {
    try {
      const { id } = req.params
      const getId = await premiereModel.getId(id)
      console.log(getId)
      if (getId.length > 0) {
        const result = await premiereModel.deleteData(id)
        return helper.response(res, 200, 'Success Delete Data', result)
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
