const ProductModel = require('../models/Product')
const CODE = require('../utils/code')
const _ = require('lodash')

const addProduct = async (req, res, next) => {
  if (!_.isEmpty(req.body)) {
    const {
      productName,
      categoryId,
      brandId,
      productPrice,
      discountType,
      discount,
      stockQuantity,
      sorted,
      productStatus,
      productDescription
    } = req.body
    const productImage =
      req.file !== '' && req.file !== null && req.file !== undefined
        ? req.file.filename
        : ''
    try {
      const addProduct = await new ProductModel({
        productName,
        categoryId,
        brandId,
        productPrice,
        discountType,
        discount,
        stockQuantity,
        sorted,
        productStatus,
        productDescription,
        productImage
      })
      const resultProduct = await addProduct.save()
      if (!_.isEmpty(resultProduct)) {
        return res.json({
          success: true,
          message: CODE.MESSAGE_CODE.ADD_PRODUCT_SUCCESS,
          addProduct: resultProduct
        })
      } else {
        return res.json({
          success: true,
          message: CODE.ERROR_CODE.ADD_PRODUCT_FAILED,
          addProduct: {}
        })
      }
    } catch (error) {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
      })
    }
  } else {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.GET_EMPTY_OBJECT
    })
  }
}

const updateProduct = async (req, res, next) => {
  if (!_.isEmpty(req.body)) {
    const {
      productName,
      categoryId,
      brandId,
      productPrice,
      discountType,
      discount,
      stockQuantity,
      sorted,
      productStatus,
      productDescription
    } = req.body
    const productImage =
      req.file !== '' && req.file !== null && req.file !== undefined
        ? req.file.filename
        : ''
    try {
      const productUpdate = {
        productName,
        categoryId,
        brandId,
        productPrice,
        discountType,
        discount,
        stockQuantity,
        sorted,
        productStatus,
        productDescription,
        productImage
      }

      if (productImage === '') {
        delete productUpdate.productImage
      }

      const resultProduct = await ProductModel.findOneAndUpdate(
        { _id: req.body._id },
        productUpdate,
        { new: true }
      )

      if (!_.isEmpty(resultProduct)) {
        return res.json({
          success: true,
          message: CODE.MESSAGE_CODE.UPDATE_PRODUCT_SUCCESS,
          updateProduct: resultProduct
        })
      } else {
        return res.json({
          success: false,
          message: CODE.ERROR_CODE.UPDATE_PRODUCT_FAILED,
          updateProduct: {}
        })
      }
    } catch (error) {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
      })
    }
  } else {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.GET_EMPTY_OBJECT
    })
  }
}

const getAllProduct = async (req, res, next) => {
  if (!_.isEmpty(req.body)) {
    const categoryArray = {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'categoryCollection'
      }
    }

    const categoryArrayToJson = { $unwind: '$categoryCollection' }

    const brandArray = {
      $lookup: {
        from: 'brands',
        localField: 'brandId',
        foreignField: '_id',
        as: 'brandCollection'
      }
    }

    const brandArrayToJson = { $unwind: '$brandCollection' }

    const filter = {
      $match: { productStatus: { $eq: req.body.productStatus } }
    }

    try {
      const getAllProduct = await ProductModel.aggregate([
        categoryArray,
        categoryArrayToJson,
        brandArray,
        brandArrayToJson,
        filter
      ]).sort({ _id: -1 })
      if (!_.isEmpty(getAllProduct)) {
        const arrayData = []

        _.forEach(getAllProduct, (value, key) => {
          arrayData.push({
            _id: value._id,
            productName: value.productName,
            categoryId: value.categoryId,
            categoryName: value.categoryCollection.categoryName,
            category: value.categoryCollection.category,
            path: value.categoryCollection.path,
            isParent: value.categoryCollection.isParent,
            categoryStatus: value.categoryCollection.categoryStatus,
            brandId: value.brandId,
            brand: value.brandCollection.brand,
            brandStatus: value.brandCollection.brandStatus,
            productImage: value.productImage,
            productPrice: value.productPrice,
            productMultipleImage: value.productMultipleImage,
            discountType: value.discountType,
            discount: value.discount,
            stockQuantity: value.stockQuantity,
            sorted: value.sorted,
            productStatus: value.productStatus,
            productDescription: value.productDescription,
            productTimezone: value.productTimezone,
            datetime: value.datetime,
            created_at: value.datetime,
            updated_at: value.updated_at
          })
        })

        return res.json({
          success: true,
          message: CODE.MESSAGE_CODE.GET_ALL_PRODUCT_SUCCESS,
          getAllProduct_length: getAllProduct.length,
          getAllProduct: arrayData
        })
      } else {
        return res.json({
          success: false,
          message: CODE.ERROR_CODE.GET_ALL_PRODUCT_FAILED,
          getAllProduct_length: 0,
          getAllProduct: {}
        })
      }
    } catch (error) {
      console.log(error)
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
      })
    }
  } else {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.GET_EMPTY_OBJECT
    })
  }
}

const getProduct = async (req, res, next) => {
  if (!_.isEmpty(req.body)) {
    try {
      const getProduct = await ProductModel.findOne({
        _id: req.body._id
      })
      if (!_.isEmpty(getProduct)) {
        return res.json({
          success: true,
          message: CODE.MESSAGE_CODE.GET_PRODUCT_SUCCESS,
          getProduct
        })
      } else {
        return res.json({
          success: false,
          message: CODE.ERROR_CODE.GET_PRODUCT_FAILED,
          getProduct: {}
        })
      }
    } catch (error) {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
      })
    }
  } else {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.GET_EMPTY_OBJECT
    })
  }
}

const updateProductStatus = async (req, res, next) => {
  if (!_.isEmpty(req.body)) {
    const { productStatus } = req.body
    try {
      const product = await ProductModel.findOneAndUpdate(
        { _id: req.body.product_id },
        { $set: { productStatus } },
        { new: true }
      )
      if (!_.isEmpty(product)) {
        return res.json({
          success: true,
          message: CODE.MESSAGE_CODE.UPDATE_PRODUCT_STATUS_SUCCESS,
          product
        })
      } else {
        return res.json({
          success: false,
          message: CODE.ERROR_CODE.UPDATE_PRODUCT_STATUS_FAILED,
          product: {}
        })
      }
    } catch (error) {
      console.log(error)
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
      })
    }
  } else {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.GET_EMPTY_OBJECT
    })
  }
}

const uploadMutipleImage = async (req, res, next) => {
  if (!_.isEmpty(req.files)) {
    if (!_.isEmpty(req.body)) {
      const resultUpdateProduct = await ProductModel.findOneAndUpdate(
        { _id: req.body.product_id },
        { $push: { productMultipleImage: req.files } },
        { upsert: true, new: true }
      )
      if (resultUpdateProduct) {
        return res.json({
          success: true,
          message: CODE.MESSAGE_CODE.UPDATE_PRODUCT_MULTI_IMAGE_STATUS_SUCCESS,
          uploadMutipleImage: req.files
        })
      } else {
        return res.json({
          success: true,
          message: CODE.ERROR_CODE.UPDATE_PRODUCT_MULTI_IMAGE_STATUS_FAILED,
          uploadMutipleImage: []
        })
      }
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.GET_EMPTY_OBJECT
      })
    }
  } else {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.GET_EMPTY_OBJECT
    })
  }
}

const deleteImageById = async (req, res, next) => {
  console.log(req.body)
  if (!_.isEmpty(req.body)) {
    const result = await ProductModel.findByIdAndUpdate(req.body.product_id, {
      $pull: {
        productMultipleImage: { _id: req.body.productMultipleImage_id }
      }
    })
    if (result) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.DELETE_PRODUCT_MULTI_IMAGE_STATUS_SUCCESS,
        uploadMutipleImage: result
      })
    } else {
      return res.json({
        success: true,
        message: CODE.ERROR_CODE.Delete_PRODUCT_MULTI_IMAGE_STATUS_FAILED,
        uploadMutipleImage: []
      })
    }
  } else {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.GET_EMPTY_OBJECT
    })
  }
}

module.exports = {
  addProduct,
  updateProduct,
  getAllProduct,
  getProduct,
  updateProductStatus,
  uploadMutipleImage,
  deleteImageById
}
