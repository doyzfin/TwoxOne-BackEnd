const helper = require('../../helpers/wrapper')
const premiereModel = require('./premiere_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllData: async (req, res) => {
    try {
      const result = await premiereModel.getDataAll()
      return helper.response(res, 200, 'Succes Get Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postPremiere: async (req, res) => {
    try {
      console.log(req.body)
      const { locationName, locationCinema } = req.body
      const setData = {
        location_name: locationName,
        location_cinema: locationCinema
      }
      const result = await premiereModel.createData(setData)
      return helper.response(res, 200, 'Succes Post New Location', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updatePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const { locationName, locationCinema } = req.body
      const setData = {
        location_name: locationName,
        location_cinema: locationCinema
      }
      const result = await premiereModel.updateData(setData, id)
      return helper.response(res, 200, 'Succes Update Movie', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const result = await premiereModel.deleteData(id)
      return helper.response(res, 200, `Succes Delete by ${id}`, result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  searchPremiere: async (req, res) => {
    try {
      const { premiereName } = req.query
      const result = await premiereModel.searchbyName(premiereName)
      return helper.response(res, 200, 'Succes Search', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  sortPremiere: async (req, res) => {
    try {
      const result = await premiereModel.sortbyName()
      return helper.response(res, 200, 'Succes Sort', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
