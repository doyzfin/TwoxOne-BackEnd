const express = require('express')
const Route = express.Router()
const premiereController = require('./premiere_controller')

Route.get('/hello', premiereController.sayHello)
Route.get('/', premiereController.getAllData)
Route.post('/', premiereController.postPremiere)
Route.patch('/:id', premiereController.updatePremiere)
Route.delete('/:id', premiereController.deletePremiere)
Route.get('/search', premiereController.searchPremiere)
Route.get('/sort', premiereController.sortPremiere)

module.exports = Route
