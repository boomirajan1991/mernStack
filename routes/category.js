const express = require('express')
const router = express.Router()
const {
  addCategory,
  updateCategory,
  getAllCategory,
  getCategory,
  updateCategoryStatus,
  getParentCategory
} = require('../controllers/category')
const { storeImageToFolder } = require('../utils/utils')
const upload = storeImageToFolder('category')
const { authenticate } = require('../middleware/auth')

router.post(
  '/addCategory',
  authenticate,
  upload.single('categoryImage'),
  addCategory
)
router.post(
  '/updateCategory',
  authenticate,
  upload.single('categoryImage'),
  updateCategory
)
router.post('/getAllCategory', authenticate, getAllCategory)
router.post('/getCategory', authenticate, getCategory)
router.post('/updateCategoryStatus', authenticate, updateCategoryStatus)
router.post('/getParentCategory', authenticate, getParentCategory)

module.exports = router
