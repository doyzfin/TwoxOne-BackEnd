const express = require('express')
const Route = express.Router()
const userController = require('./user_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFileUser = require('../../middleware/uploadUser')
const redisMiddleware = require('../../middleware/redis')

Route.get('/', authMiddleware.authentication, userController.getData)
Route.get(
  '/:id',
  authMiddleware.authentication,
  redisMiddleware.getUserId,
  userController.getDataUser
)
Route.patch(
  '/change/:id',
  redisMiddleware.clearDataUser,
  uploadFileUser,
  redisMiddleware.clearDataUser,
  userController.updateProfile
)
Route.patch(
  '/change-password/:id',
  redisMiddleware.clearDataUser,
  userController.updatePassword
)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  redisMiddleware.clearDataUser,
  userController.updateDataUser
)

module.exports = Route
