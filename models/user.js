const moment = require('moment')
require('moment-timezone')
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  googleId: {
    type: String,
    required: false
  },
  id: {
    type: String
  },
  usertype: {
    type: String,
    enum: ['ADMIN', 'MANAGER', 'DELIVERY', 'USER']
  },
  phonenumber: {
    type: Number,
    required: true
  },
  address: {
    doornumber: {
      type: String,
      required: true
    },
    line1: {
      type: String,
      required: true
    },
    line2: {
      type: String
    },
    country: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    landmark: {
      type: String
    }
  },
  geoLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: 'Point'
    },
    coordinates: [Number]
  },
  usertimezone: {
    type: String,
    default: moment.tz.guess()
  },
  user_datetime: {
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

module.exports = mongoose.model('User', userSchema)
