const SettingsModel = require('../models/settings')
const CODE = require('../utils/code')

const updateSettings = async (req, res, next) => {
  await SettingsModel.findOneAndUpdate({ _id: req.body.setting_id }, req.body, {
    new: true
  }).then(
    (setting) => {
      if (setting) {
        return res.json({
          success: true,
          message: CODE.MESSAGE_CODE.UPDATE_SETTING_SUCCESS,
          setting
        })
      } else {
        return res.json({
          success: false,
          message: CODE.ERROR_CODE.UPDATE_SETTING_FAILED
        })
      }
    },
    (error) => {
      console.log(error)
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
      })
    }
  )
}

const getSettings = async (req, res, next) => {
  try {
    const getSetting = await SettingsModel.findOne({
      _id: req.body.setting_id
    })
    if (getSetting) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.GET_SETTING_SUCCESS,
        getSetting
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.GET_SETTING_FAILED
      })
    }
  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  }
}

module.exports = { updateSettings, getSettings }
