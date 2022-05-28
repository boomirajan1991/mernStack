const express = require('express')
const router = express.Router()
const { updateSettings, getSettings } = require('../controllers/settings')
const { authenticate } = require('../middleware/auth')
router.post('/updateSettings', authenticate, updateSettings)
router.post('/getSettings', authenticate, getSettings)
module.exports = router
