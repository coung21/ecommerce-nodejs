const router = require('express').Router()
const AuthController = require('../../controllers/auth.controller')

router.post('/shop/signup', AuthController.signUp)

module.exports = router