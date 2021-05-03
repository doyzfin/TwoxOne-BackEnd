const express = require('express')
const Route = express.Router()
// 1
// const { sayHello } = require('./movie_controller')
// 2
const movieController = require('./movie_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')
const redisMiddleware = require('../../middleware/redis')

// 1
// Route.get('/hello', sayHello)
// 2
Route.get('/hello', movieController.sayHello)
Route.get(
  '/',
  authMiddleware.authentication,
  redisMiddleware.getMovieRedis,
  movieController.getAllMovie
)
Route.get(
  '/month/:id',
  authMiddleware.authentication,
  movieController.getMovieByMonth
)
Route.get(
  '/:id',
  authMiddleware.authentication,
  redisMiddleware.getMovieByIdRedis,
  movieController.getMovieById
)

Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  redisMiddleware.clearDataMovieRedis,
  movieController.postMovie
)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  redisMiddleware.clearDataMovieRedis,
  movieController.updateMovie
)
Route.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearDataMovieRedis,
  movieController.deleteMovie
)

module.exports = Route
