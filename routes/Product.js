const express = require('express')
const router = express.Router()
const {
  addProduct,
  updateProduct,
  getAllProduct,
  getProduct,
  updateProductStatus,
  uploadMutipleImage,
  deleteImageById
} = require('../controllers/Product')
const { storeImageToFolder } = require('../utils/utils')
const upload = storeImageToFolder('product')
const { authenticate } = require('../middleware/auth')

router.post(
  '/addProduct',
  authenticate,
  upload.single('productImage'),
  addProduct
)
router.post(
  '/updateProduct',
  authenticate,
  upload.single('productImage'),
  updateProduct
)
router.post('/getAllProduct', authenticate, getAllProduct)
router.post('/getProduct', authenticate, getProduct)
router.post('/updateProductStatus', authenticate, updateProductStatus)
router.post('/deleteImageById', authenticate, deleteImageById)
router.post(
  '/uploadMutipleImage',
  authenticate,
  upload.array('productMutipleImage', 30),
  uploadMutipleImage
)
module.exports = router
