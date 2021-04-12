const helper = require('../../helpers/wrapper')
// const { getDataAll } = require('./movie_model')
const movieModel = require('./movie_model')
module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllMovie: async (req, res) => {
    try {
      let { search, page, limit, sort } = req.query
      console.log(req.query)
      page = parseInt(page)
      limit = parseInt(limit)
      if (search !== 'null') {
        page = 1
      } else {
        console.log(null)
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
      return helper.response(
        res,
        200,
        `Succes Get Data, Search Data, and Sort by ${sort}`,
        result,
        pageInfo
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getDataById(id)
      if (result.length > 0) {
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
        movie_synopsis: movieSynopsis,
        movie_created_at: new Date(Date.now()),
        movie_updated_at: new Date(Date.now())
      }
      const result = await movieModel.createData(setData)
      return helper.response(res, 200, 'Succes Post Movie', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateMovie: async (req, res) => {
    try {
      const { id } = req.params
      console.log(req.params)
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
        movie_created_at: new Date(Date.now()),
        movie_updated_at: new Date(Date.now())
      }
      console.log(setData)
      const result = await movieModel.updateData(setData, id)
      // if (id.length > 0) {
      //   return helper.response(
      //     res,
      //     200,
      //     `Succes Update Data By Id = ${id}`,
      //     result
      //   )
      // } else {
      //   return helper.response(res, 404, `Data Not Found By Id = ${id}`, null)
      // }
      return helper.response(
        res,
        200,
        `Succes Update Data By Id = ${id}`,
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.deleteData(id)
      console.log(result)
      // if (result > 0) {
      //   return helper.response(res, 200, `Succes Delete Movie by ${id}`, result)
      // } else {
      //   return helper.response(res, 404, `Data Not Found By Id = ${id}`, null)
      // }
      return helper.response(res, 200, `Succes Delete Movie by ${id}`, result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  searchbyName: async (req, res) => {
    try {
      const { movieName } = req.query
      console.log(movieName)
      const result = await movieModel.searchName(movieName)
      return helper.response(res, 200, 'Succes search movie by ', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  sortYear: async (req, res) => {
    try {
      const result = await movieModel.sorting()
      return helper.response(res, 200, 'Succes Sorting', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
