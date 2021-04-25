const express = require('express')
const Route = express.Router()
const premiereController = require('./premiere_controller')

Route.post('/', premiereController.postPremiereData)
Route.get('/', premiereController.getPremiereData)
Route.get('/db', premiereController.getAllDataDB)
Route.patch('/:id', premiereController.updatePremiereData)
Route.delete('/:id', premiereController.deletePremiereData)

module.exports = Route
