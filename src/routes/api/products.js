const router = require('express').Router()
const authenticate = require('../../middlewares/auth.middleware')
const ProductController = require('../../controllers/product.controller')

router.post('/shop/product', authenticate ,ProductController.createProduct)

module.exports = router