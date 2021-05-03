const express = require('express')
const Route = express.Router()
const userController = require('./user_controller')
const authMiddleware = require('../../middleware/auth')
// const uploadFile = require('../../middleware/uploads')
const redisMiddleware = require('../../middleware/redis')

Route.get(
  '/:id',
  authMiddleware.authentication,
  redisMiddleware.getUserId,
  userController.getDataUser
)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  userController.updateDataUser
)

module.exports = Route
