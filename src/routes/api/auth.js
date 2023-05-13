const router = require('express').Router()
const AuthController = require('../../controllers/auth.controller')
const authenticate = require('../../middlewares/auth.middleware')

router.post('/shop/signup', AuthController.signUp)
router.post('/shop/login', AuthController.logIn)
router.post('/shop/logout', authenticate ,AuthController.logOut)
router.post('/shop/newtoken', AuthController.refreshTokenHanlder)

module.exports = router