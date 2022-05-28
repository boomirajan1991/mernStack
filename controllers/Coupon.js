const CouponModel = require('../models/Coupon')
const CODE = require('../utils/code')

const addCoupon = async (req, res, next) => {
  const { couponCode, couponType, isTypevalue, times, couponStatus } = req.body
  try {
    const addCoupon = await new CouponModel({
      couponCode,
      couponType,
      isTypevalue,
      times,
      couponStatus
    }).save()
    if (addCoupon) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.ADD_COUPON_SUCCESS,
        addCoupon
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.ADD_COUPON_FAILED,
        addCoupon: {}
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

const updateCoupon = async (req, res, next) => {
  const { couponCode, couponType, isTypevalue, times, couponStatus } = req.body
  const couponUpdate = {
    couponCode,
    couponType,
    isTypevalue,
    times,
    couponStatus
  }
  try {
    const updateCoupon = await CouponModel.findOneAndUpdate(
      { _id: req.body.coupon_id },
      couponUpdate,
      { new: true }
    )
    if (updateCoupon) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.UPDATE_COUPON_SUCCESS,
        updateCoupon
      })
    } else {
      return res.json({
        success: true,
        message: CODE.ERROR_CODE.UPDATE_COUPON_FAILED,
        updateCoupon: {}
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

const getAllCoupon = async (req, res, next) => {
  try {
    const getAllCoupon = await CouponModel.aggregate([
      { $match: { couponStatus: { $eq: req.body.couponStatus } } }
    ]).sort({ _id: -1 })
    if (getAllCoupon.length > 0) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.GET_ALL_COUPON_SUCCESS,
        getAllCoupon_length: getAllCoupon.length,
        getAllCoupon
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.NO_DATA_FOUND,
        getAllCoupon: {}
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

const getCoupon = async (req, res, next) => {
  try {
    const getCoupon = await CouponModel.findOne({ _id: req.body.coupon_id })
    if (getCoupon) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.GET_COUPON_SUCCESS,
        getCoupon
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.NO_DATA_FOUND,
        getCoupon: {}
      })
    }
  } catch (error) {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  }
}

const updateCouponStatus = async (req, res, next) => {
  const { couponStatus } = req.body
  try {
    const coupon = await CouponModel.findOneAndUpdate(
      { _id: req.body.coupon_id },
      { $set: { couponStatus } },
      { new: true }
    )
    if (coupon) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.UPDATE_COUPON_SUCCESS,
        coupon
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.UPDATE_COUPON_FAILED,
        coupon: {}
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

const getCouponCode = async (req, res, next) => {
  try {
    const getCouponCoderesult = await CouponModel.findOne(req.body)
    if (getCouponCoderesult) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.GET_COUPONCODE_SUCCESS,
        getCouponCode: getCouponCoderesult
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.GET_COUPONCODE_FAILED,
        getCouponCode: {}
      })
    }
  } catch (error) {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  }
}

module.exports = {
  addCoupon,
  updateCoupon,
  getAllCoupon,
  getCoupon,
  updateCouponStatus,
  getCouponCode
}
