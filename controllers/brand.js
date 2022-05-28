const BrandModel = require('../models/brand')
const CODE = require('../utils/code')

const addBrand = async (req, res, next) => {
  const { brand, brandStatus } = req.body
  const brandImage = (req.file !== '' && req.file !== null && req.file !== undefined) ? req.file.filename : ''
  const addBrand = await new BrandModel({
    brand,
    brandStatus,
    brandImage
  })
  addBrand.save().then((result) => {
    return res.json({
      success: true,
      message: CODE.MESSAGE_CODE.ADD_BRAND_SUCCESS,
      addBrand
    })
  }).catch((_err) => {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  })
}

const updateBrand = async (req, res, next) => {
  const { brand, brandStatus } = req.body
  const brandImage = (req.file !== '' && req.file !== null && req.file !== undefined) ? req.file.filename : ''
  const brandUpdate = {
    brand,
    brandStatus,
    brandImage
  }
  if (brandImage === '') { delete brandUpdate.brandImage }
  await BrandModel.findOneAndUpdate({ _id: req.body.brand_id }, brandUpdate, { new: true }).then((brand) => {
    if (brand) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.UPDATE_BRAND_SUCCESS,
        brand
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.UPDATE_BRAND_FAILED,
        brand: {}
      })
    }
  }, (error) => {
    console.log(error)
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  })
}

const getAllBrand = async (req, res, next) => {
  try {
    const getAllBrand = await BrandModel.aggregate([{ $match: { brandStatus: { $eq: req.body.brandStatus } } }]).sort({ _id: -1 })
    if (getAllBrand.length > 0) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.GET_ALL_BRAND_SUCCESS,
        getAllArticle_length: getAllBrand.length,
        getAllBrand
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.NO_DATA_FOUND,
        getAllBrand: {}
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

const getBrand = async (req, res, next) => {
  try {
    const getBrand = await BrandModel.findOne({ _id: req.body.brand_id })
    if (getBrand) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.GET_BRAND_SUCCESS,
        getBrand
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.NO_DATA_FOUND,
        getBrand: {}
      })
    }
  } catch (error) {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  }
}

const updateBrandStatus = async (req, res, next) => {
  const { brandStatus } = req.body
  await BrandModel.findOneAndUpdate({ _id: req.body.brand_id }, { $set: { brandStatus } }, { new: true }).then((brand) => {
    if (brand) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.UPDATE_BRAND_SUCCESS,
        brand
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.UPDATE_BRAND_FAILED
      })
    }
  }, (error) => {
    console.log(error)
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  })
}

module.exports = { addBrand, updateBrand, getAllBrand, getBrand, updateBrandStatus }
