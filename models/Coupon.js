const moment = require('moment')
require('moment-timezone')
const mongoose = require('mongoose')
const couponSchema = mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: true
    },
    couponType: {
      type: Boolean,
      required: true
    },
    isTypevalue: {
      type: String,
      required: true
    },
    times: {
      type: Number,
      required: true
    },
    couponStatus: {
      type: Boolean,
      default: true
    },
    couponTimezone: {
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

module.exports = mongoose.model('Coupon', couponSchema)
