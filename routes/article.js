const express = require('express')
const router = express.Router()
const { addarticle, updatearticle, getallarticle, getarticle, updateArticleStatus } = require('../controllers/article')
const { storeImageToFolder } = require('../utils/utils')
const upload = storeImageToFolder('article')
const { authenticate } = require('../middleware/auth')

router.post('/addarticle', authenticate, upload.single('articleimage'), addarticle)
router.post('/updatearticle', authenticate, upload.single('articleimage'), updatearticle)
router.post('/getallarticle', authenticate, getallarticle)
router.post('/getarticle', authenticate, getarticle)
router.post('/updateArticleStatus', authenticate, updateArticleStatus)

module.exports = router
