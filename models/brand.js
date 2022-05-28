const moment = require('moment')
require('moment-timezone')
const mongoose = require('mongoose')
const BrandSchema = mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  brandStatus: {
    type: Boolean,
    default: true
  },
  brandImage: {
    type: String
  },
  brandTimezone: {
    type: String,
    default: moment.tz.guess()
  },
  dateTime: {
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
}, {
  strict: true,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Brand', BrandSchema)
