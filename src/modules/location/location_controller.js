const helper = require('../../helpers/wrapper')
const locationModel = require('./location_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllData: async (req, res) => {
    try {
      const result = await locationModel.getDataAll()
      return helper.response(res, 200, 'Succes Get Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postlocation: async (req, res) => {
    try {
      console.log(req.body)
      const { locationName, locationAddress } = req.body
      const setData = {
        location_name: locationName,
        location_address: locationAddress
      }
      const result = await locationModel.createData(setData)
      return helper.response(res, 200, 'Succes Post New Location', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updatelocation: async (req, res) => {
    try {
      const { id } = req.params
      const { locationName, locationAddress } = req.body
      const setData = {
        location_name: locationName,
        location_address: locationAddress
      }
      const result = await locationModel.updateData(setData, id)
      return helper.response(res, 200, 'Succes Update Movie', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletelocation: async (req, res) => {
    try {
      const { id } = req.params
      const result = await locationModel.deleteData(id)
      return helper.response(res, 200, `Succes Delete by ${id}`, result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
// searchlocation: async (req, res) => {
//   try {
//     const { locationName } = req.query
//     const result = await locationModel.searchbyName(locationName)
//     return helper.response(res, 200, 'Succes Search', result)
//   } catch (error) {
//     return helper.response(res, 400, 'Bad Request', error)
//   }
// },
// sortlocation: async (req, res) => {
//   try {
//     const result = await locationModel.sortbyName()
//     return helper.response(res, 200, 'Succes Sort', result)
//   } catch (error) {
//     return helper.response(res, 400, 'Bad Request', error)
//   }
// }
