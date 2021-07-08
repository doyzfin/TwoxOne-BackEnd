const express = require('express')
const Route = express.Router()

const { register, login, refresh } = require('./auth_controller')
const userModel = require('../../modules/User/user_controller')

Route.get('/validate/:id', userModel.updateDataUser, userModel.getDataUser)
Route.post('/login', login)
Route.post('/register', register)
Route.post('/refresh', refresh)

module.exports = Route
