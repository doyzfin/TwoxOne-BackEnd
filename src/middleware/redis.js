const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/wrapper')

module.exports = {
  getMovieByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getmovie:${id}`, (error, result) => {
      if (!error && result != null) {
        return helper.response(
          res,
          200,
          'Success Get Data By Id',
          JSON.parse(result)
        )
      } else {
        next()
        console.log('Data Not in Redis')
      }
    })
  },
  getMovieRedis: (req, res, next) => {
    client.get(`getmovie:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log('Data in Redis')
        const newResult = JSON.parse(result)
        return helper.response(
          res,
          200,
          'Success Get All Movies',
          newResult.data,
          newResult.pageInfo
        )
      } else {
        next()
        console.log('Data Not in Redis')
      }
    })
  },
  clearDataMovieRedis: (req, res, next) => {
    client.keys('getmovie*', (_error, result) => {
      // console.log(result)
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  }
}