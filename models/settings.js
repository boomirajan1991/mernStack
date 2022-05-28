const moment = require('moment')
require('moment-timezone')
const mongoose = require('mongoose')
const settingsSchema = mongoose.Schema({
  storename: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobilenumber: {
    type: String,
    required: true
  },
  vatnumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  order_notification_email: {
    type: String,
    required: true
  },
  whatsappnumber: {
    type: String,
    required: true
  },
  settings_timezone: {
    type: String,
    default: moment.tz.guess()
  },
  settings_datetime: {
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

module.exports = mongoose.model('Settings', settingsSchema)
