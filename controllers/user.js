const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const CODE = require('../utils/code')

const signin = async (req, res) => {
  const { email, password } = req.body
  try {
    const oldUser = await UserModel.findOne({ email })
    if (oldUser) {
      const correctPassword = bcrypt.compareSync(password, oldUser.password)
      if (correctPassword) {
        const token = jwt.sign(
          { email: oldUser.email, id: oldUser._id },
          process.env.SECRET,
          { expiresIn: '1h' }
        )
        return res.json({
          success: true,
          message: CODE.MESSAGE_CODE.SIGNIN_SUCCESS,
          user: oldUser,
          token
        })
      } else {
        return res.json({
          success: false,
          message: CODE.ERROR_CODE.INCORRECT_PASSWORD
        })
      }
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.UNREGISTERED_EMAIL
      })
    }
  } catch (error) {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  }
}

const signup = async (req, res) => {
  req.body.usertype = 'ADMIN'
  const { email, firstname, lastname, password, usertype, phonenumber, address } = req.body
  try {
    const oldUser = await UserModel.findOne({ email })
    if (oldUser) {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.EMAIL_EXISTS
      })
    }
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    const result = await UserModel.create({
      email,
      usertype,
      phonenumber,
      address,
      username: `${firstname} ${lastname}`,
      password: hashPassword
    })

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET, {
      expiresIn: '1h'
    })

    return res.json({
      success: true,
      message: CODE.MESSAGE_CODE.SIGNUP_SUCCESS,
      result,
      token
    })
  } catch (error) {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  }
}

const getuser = async (req, res, next) => {
  const getUser = await UserModel.findOne({ _id: req.body.user_id })
  if (getUser) {
    return res.json({
      success: true,
      message: CODE.MESSAGE_CODE.GET_USER_SUCCESS,
      getUser
    })
  } else {
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  }
}

const updateuser = async (req, res, next) => {
  await UserModel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }).then((user) => {
    if (user) {
      return res.json({
        success: true,
        message: CODE.MESSAGE_CODE.UPDATE_USER_SUCCESS,
        user
      })
    } else {
      return res.json({
        success: false,
        message: CODE.ERROR_CODE.UPDATE_USER_FAILED
      })
    }
  }, (error) => {
    console.log(error)
    return res.json({
      success: false,
      message: CODE.ERROR_CODE.SOMETHING_WENT_WRONG
    })
  })
}

module.exports = { signin, signup, getuser, updateuser }
