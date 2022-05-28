const express = require('express')
const router = express.Router()
const { addCoupon, updateCoupon, getAllCoupon, getCoupon, updateCouponStatus, getCouponCode } = require('../controllers/Coupon')
const { authenticate } = require('../middleware/auth')

router.post('/addCoupon', authenticate, addCoupon)
router.post('/updateCoupon', authenticate, updateCoupon)
router.post('/getAllCoupon', authenticate, getAllCoupon)
router.post('/getCoupon', authenticate, getCoupon)
router.post('/updateCouponStatus', authenticate, updateCouponStatus)
router.post('/getCouponCode', authenticate, getCouponCode)

module.exports = router
