const express = require('express')
const Route = express.Router()
const movieRouter = require('../modules/movie/movie_routes')

// Route.get('/hello', (req, res) => {
//   res.status(200).send('Hello World')
// })
Route.use('/movie', movieRouter)
module.exports = Route
