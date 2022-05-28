const moment = require('moment')
require('moment-timezone')
const mongoose = require('mongoose')

const multipleImageSubSchema = mongoose.Schema({
  fieldname: { type: String, required: false },
  originalname: { type: String, required: false },
  encoding: { type: String, required: false },
  mimetype: { type: String, required: false },
  filename: { type: String, required: false },
  destination: { type: String, required: false },
  path: { type: String, required: false },
  size: { type: String, required: false }
})

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    productImage: {
      type: String,
      required: false
    },
    productPrice: {
      type: Number,
      required: true
    },
    discountType: {
      type: String,
      enum: ['NO DISCOUNT', 'DISCOUNT BY PRICE', 'DISCOUNT BY PERCENTAGE']
    },
    discount: {
      type: Number,
      required: true
    },
    stockQuantity: {
      type: Number,
      required: true
    },
    sorted: {
      type: Number,
      required: true
    },
    productStatus: {
      type: Boolean,
      default: true
    },
    productDescription: {
      type: String,
      required: true
    },
    productMultipleImage: [multipleImageSubSchema],
    productTimezone: {
      type: String,
      default: moment.tz.guess()
    },
    datetime: {
      type: Date,
      default: new Date().toLocaleString()
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    strict: true,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

module.exports = mongoose.model('Product', productSchema)
