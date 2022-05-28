const moment = require('moment')
require('moment-timezone')
const mongoose = require('mongoose')
const articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  article: {
    type: String,
    required: true
  },
  authorname: {
    type: String,
    required: false
  },
  articleimage: {
    type: String,
    required: false
  },
  articlestatus: {
    type: Boolean,
    default: true
  },
  articletimezone: {
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

module.exports = mongoose.model('Article', articleSchema)
