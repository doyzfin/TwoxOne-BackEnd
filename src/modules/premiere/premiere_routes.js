const express = require('express')
const Route = express.Router()
const premiereController = require('./premiere_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')
const redisMiddleware = require('../../middleware/redis')

Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  redisMiddleware.clearDataPremiere,
  premiereController.postPremiereData
)
Route.get(
  '/db',
  authMiddleware.authentication,
  redisMiddleware.getDataPremiere,
  premiereController.getAllDataDB
)
Route.get(
  '/',
  authMiddleware.authentication,
  redisMiddleware.getDataPremiere,
  premiereController.getPremiereData
)
Route.get('/db/:id', premiereController.getAllDataDBId)

Route.patch(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  redisMiddleware.clearDataPremiere,
  premiereController.updatePremiereData
)
Route.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  redisMiddleware.clearDataPremiere,
  premiereController.deletePremiereData
)

module.exports = Route
