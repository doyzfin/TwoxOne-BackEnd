const redis = require('redis')
const client = redis.createClient()
const helper = require('../../helpers/wrapper')
const fs = require('fs')
// const { getDataAll } = require('./movie_model')
const movieModel = require('./movie_model')
module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllMovie: async (req, res) => {
    try {
      let { search, page, limit, sort } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      if (!sort) {
        sort = 'movie_id ASC'
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
      const totalData = await movieModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await movieModel.getDataAll(search, sort, limit, offset)
      client.setex(
        `getmovie:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      )
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Succes Get Data, Search Data, and Sort by ${sort}`,
          result,
          pageInfo
        )
      } else {
        return helper.response(res, 404, 'Data Not Found ', null, pageInfo)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getDataById(id)
      if (result.length > 0) {
        client.set(`getmovie:${id}`, JSON.stringify(result))
        return helper.response(
          res,
          200,
          `Succes Get Data By Id = ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `Data Not Found By Id = ${id}`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getMovieByMonth: async (req, res) => {
    try {
      console.log(req.params)
      const { id } = req.params
      const result = await movieModel.getDataByMonth(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Succes Get Data By Id =${id} `,
          result
        )
      } else {
        return helper.response(res, 404, `Data Not Found By Id = ${id}`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postMovie: async (req, res) => {
    try {
      console.log(req.body)
      const {
        movieName,
        movieCategory,
        movieReleaseDate,
        movieDirector,
        movieDuration,
        movieCast,
        movieSynopsis
      } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_director: movieDirector,
        movie_duration: movieDuration,
        movie_cast: movieCast,
        movie_image: req.file ? req.file.filename : '',
        movie_synopsis: movieSynopsis,
        movie_created_at: new Date(Date.now()),
        movie_updated_at: new Date(Date.now())
      }
      console.log(setData)
      const result = await movieModel.createData(setData)

      // const setData2 = {
      //   movie_id: result.id,
      //   premiere_name: premiereName
      // }
      // eslint-disable-next-line no-unused-vars
      // const resultSeat = await movieModel.postPremiereMovie(setData2)
      return helper.response(res, 200, 'Succes Post Movie', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateMovie: async (req, res) => {
    try {
      const { id } = req.params
      const {
        movieName,
        movieCategory,
        movieReleaseDate,
        movieDirector,
        movieDuration,
        movieCast,
        movieSynopsis
      } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_director: movieDirector,
        movie_duration: movieDuration,
        movie_cast: movieCast,
        movie_synopsis: movieSynopsis,
        movie_image: req.file ? req.file.filename : '',
        movie_created_at: new Date(Date.now()),
        movie_updated_at: new Date(Date.now())
      }
      const getData = await movieModel.getDataById(id)
      if (getData.length > 0) {
        const result = await movieModel.updateData(setData, id)
        console.log(req.file.filename)
        console.log(result.movie_image)
        if (result.movie_image !== req.file.filename) {
          return helper.response(
            res,
            200,
            `Succes Update Data By Id = ${id} And Img`,
            result
          )
        } else {
          const src = `src/uploads/${getData[0].movie_image}`
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
      } else {
        return helper.response(res, 404, `Data Not Found By Id = ${id}`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params
      const getData = await movieModel.getDataById(id)
      const isImageExsist = getData[0].movie_image
      const result = await movieModel.deleteData(id)
      // kondisi untuk cek ada gambar atau tidak dari get data
      if (getData.length > 0 && isImageExsist) {
        const src = `src/uploads/${getData[0].movie_image}`
        if (fs.existsSync(src)) {
          fs.unlink(src, function (err) {
            if (err) throw err
            // if no error, file has been deleted successfully
            console.log('File deleted!')
          })
        }
        return helper.response(res, 200, `Succes Delete Movie by ${id}`, result)
      } else {
        return helper.response(res, 404, `Data Not Found By Id = ${id}`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
