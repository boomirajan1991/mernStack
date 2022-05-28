const jwt = require('jsonwebtoken')
const CODE = require('../utils/code')

const authenticate = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const decoded = jwt.verify(req.headers.authorization, process.env.SECRET)
      if (decoded === undefined) {
        return res.json({
          success: false,
          message: CODE.ERROR_CODE.UNAUTHORIZED
        })
      } else {
        req.userId = decoded.id
        req.userEmail = decoded.email
        next()
      }
    } catch (err) {
      console.log(err)
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.UNAUTHORIZED
      })
    }
  } else {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.UNAUTHORIZED
    })
  }
}

module.exports = { authenticate }
