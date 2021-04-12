const express = require('express')
const Route = express.Router()
const scheduleController = require('./schedule_controller')

Route.get('/hello', scheduleController.sayHello)
Route.get('/', scheduleController.getAllData)
Route.post('/', scheduleController.postSchedule)
Route.patch('/:id', scheduleController.updateScheduleTime)
Route.delete('/:id', scheduleController.deleteScheduleTime)
// Route.get('/search', scheduleController.searchData)
// Route.get('/sort', scheduleController.sortData)

module.exports = Route
