const router = require('express').Router()
const {apiKeyMiddleware} = require('../middlewares/businesskey.middleware')

//check api key for api
router.use(apiKeyMiddleware)

//authentication route
router.use('/v1/api', require('./api/auth'))
router.use('/v1/api', require('./api/products'))

module.exports = router