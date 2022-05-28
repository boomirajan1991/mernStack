const moment = require('moment')
require('moment-timezone')
const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  isParent: {
    type: Boolean,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId
  },
  categoryImage: {
    type: String,
    required: false
  },
  categoryStatus: {
    type: Boolean,
    default: true
  },
  categoryTimezone: {
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
}, {
  strict: true,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Category', categorySchema)
