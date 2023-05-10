const router = require('express').Router()
const AuthController = require('../../controllers/auth.controller')

router.post('/shop/signup', AuthController.signUp)
router.post('/shop/login', AuthController.logIn)

module.exports = router