require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const moment = require('moment')
require('moment-timezone')
const connectDB = require('./db')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const articleRouter = require('./routes/article')
const settingsRouter = require('./routes/settings')
const brandRouter = require('./routes/brand')
const categoryRouter = require('./routes/category')
const couponRouter = require('./routes/Coupon')
const productRouter = require('./routes/Product')

connectDB()
const app = express()
console.log(new Date())
console.log(new Date().toLocaleString())
console.log(Date())
console.log(moment.tz.guess())
const dec = moment(new Date())
console.log(dec.tz('America/Los_Angeles').format('ha z'))
console.log(dec.tz('America/New_York').format('ha z'))
console.log(dec.tz('Asia/Tokyo').format('ha z'))
console.log(dec.tz('Australia/Sydney').format('ha z'))
console.log(dec.tz(moment.tz.guess()).format('DD-MM-YYYY hh:mm:ss a'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(logger('dev'))
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/article', articleRouter)
app.use('/setting', settingsRouter)
app.use('/brand', brandRouter)
app.use('/category', categoryRouter)
app.use('/coupon', couponRouter)
app.use('/product', productRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
