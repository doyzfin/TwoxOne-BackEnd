const express = require('express')
const Route = express.Router()
const locationController = require('./location_controller')

Route.get('/hello', locationController.sayHello)
Route.get('/', locationController.getAllData)
Route.post('/', locationController.postlocation)
Route.patch('/:id', locationController.updatelocation)
Route.delete('/:id', locationController.deletelocation)
// Route.get('/search', locationController.searchlocation)
// Route.get('/sort', locationController.sortlocation)

module.exports = Route
