const express = require('express')
const router = express.Router()
const { signup, signin, getuser, updateuser } = require('../controllers/user')
const { authenticate } = require('../middleware/auth')

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/getuser', authenticate, getuser)
router.post('/updateuser', authenticate, updateuser)

module.exports = router
