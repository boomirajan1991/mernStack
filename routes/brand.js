const express = require('express')
const router = express.Router()
const { addBrand, updateBrand, getAllBrand, getBrand, updateBrandStatus } = require('../controllers/brand')
const { storeImageToFolder } = require('../utils/utils')
const upload = storeImageToFolder('brand')
const { authenticate } = require('../middleware/auth')

router.post('/addBrand', authenticate, upload.single('brandImage'), addBrand)
router.post('/updateBrand', authenticate, upload.single('brandImage'), updateBrand)
router.post('/getAllBrand', authenticate, getAllBrand)
router.post('/getBrand', authenticate, getBrand)
router.post('/updateBrandStatus', authenticate, updateBrandStatus)

module.exports = router
