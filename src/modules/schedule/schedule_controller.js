const helper = require('../../helpers/wrapper')
const scheduleModel = require('./schedule_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllData: async (req, res) => {
    try {
      const result = await scheduleModel.getData()
      return helper.response(res, 200, 'Succes Get All Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postSchedule: async (req, res) => {
    try {
      const { premiereId, scheduleDate, scheduleTime } = req.body
      const setData = {
        premiere_id: premiereId,
        schedule_date: scheduleDate,
        schedule_time: scheduleTime
      }
      const result = await scheduleModel.createTime(setData)
      return helper.response(res, 200, 'Succes Post Time', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateScheduleTime: async (req, res) => {
    try {
      const { id } = req.params
      const { premiereId, scheduleDate, scheduleTime } = req.body
      const setData = {
        premiere_id: premiereId,
        schedule_date: scheduleDate,
        schedule_time: scheduleTime
      }
      const getId = await scheduleModel.getId(id)
      if (getId.length > 0) {
        const result = await scheduleModel.updatedataTime(setData, id)
        return helper.response(res, 200, 'Succes Update Time Data', result)
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteScheduleTime: async (req, res) => {
    try {
      const { id } = req.params
      const getId = await scheduleModel.getId(id)
      if (getId.length > 0) {
        const result = await scheduleModel.deletedataTime(id)
        return helper.response(res, 200, 'Succes Delete Time Data', result)
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
