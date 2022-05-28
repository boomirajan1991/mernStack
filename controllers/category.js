const CategoryModel = require('../models/category')
const CODE = require('../utils/code')

const addCategory = async (req, res, next) => {
  const { categoryName, isParent, path, category, categoryId, categoryStatus } = req.body
  const categoryImage = (req.file !== '' && req.file !== null && req.file !== undefined) ? req.file.filename : ''
  const addCategory = await new CategoryModel({
    categoryName,
    isParent,
    path,
    category,
    categoryId,
    categoryStatus,
    categoryImage
  })
  addCategory.save().then((result) => {
    console.log(result)
    return res.json({
      success: true,
      message: CODE.MESSAGE_CODE.ADD_CATEGORY_SUCCESS,
      addCategory
    })
  }).catch((_err) => {
    console.log(_err)
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  })
}

const updateCategory = async (req, res, next) => {
  const { categoryName, isParent, path, category, categoryId, categoryStatus } = req.body
  const categoryImage = (req.file !== '' && req.file !== null && req.file !== undefined) ? req.file.filename : ''
  const categoryUpdate = {
    categoryName,
    isParent,
    path,
    category,
    categoryId,
    categoryStatus,
    categoryImage
  }
  if (categoryImage === '') { delete categoryUpdate.categoryImage }
  await CategoryModel.findOneAndUpdate({ _id: req.body.category_id }, categoryUpdate, { new: true }).then((category) => {
    if (category) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.UPDATE_CATEGORY_SUCCESS,
        category
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.UPDATE_CATEGORY_FAILED
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

const getAllCategory = async (req, res, next) => {
  try {
    const getAllCategory = await CategoryModel.aggregate([{ $match: { categoryStatus: { $eq: req.body.categoryStatus } } }]).sort({ _id: -1 })
    if (getAllCategory.length > 0) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.GET_ALL_CATEGORY_SUCCESS,
        getAllArticle_length: getAllCategory.length,
        getAllCategory
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.NO_DATA_FOUND,
        getAllCategory: {}
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

const getCategory = async (req, res, next) => {
  try {
    const getCategory = await CategoryModel.findOne({ _id: req.body.category_id })
    if (getCategory) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.GET_CATEGORY_SUCCESS,
        getCategory
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.NO_DATA_FOUND,
        getCategory: {}
      })
    }
  } catch (error) {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  }
}

const getParentCategory = async (req, res, next) => {
  try {
    const getParentCategory = await CategoryModel.find({ isParent: true })
    if (getParentCategory) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.GET_PARENT_CATEGORY_SUCCESS,
        getParentCategory
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.NO_DATA_FOUND,
        getParentCategory: {}
      })
    }
  } catch (error) {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  }
}

const updateCategoryStatus = async (req, res, next) => {
  const { categoryStatus } = req.body
  await CategoryModel.findOneAndUpdate({ _id: req.body.category_id }, { $set: { categoryStatus } }, { new: true }).then((category) => {
    if (category) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.UPDATE_CATEGORY_SUCCESS,
        category
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.UPDATE_CATEGORY_FAILED,
        category: {}
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

module.exports = { addCategory, updateCategory, getAllCategory, getCategory, updateCategoryStatus, getParentCategory }
