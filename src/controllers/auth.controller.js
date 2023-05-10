const AuthService = require('../services/auth.service');
const {successResponse, errorResponse} = require('../utils/responseApi.utils')

class AuthController {
  static async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const newShop = await AuthService.signUp(name, email, password);
      return successResponse(res, newShop, 201)
    } catch (error) {
      return errorResponse(res, error.message, error.status)
    }
  }

  static async logIn(req, res){
    try {
      const {email, password} = req.body
      const shop = await AuthService.logIn(email, password)
      return successResponse(res, shop, 200)
    } catch (error) {
      return errorResponse(res, error.message, error.status)
    }
  }

  static async logOut(req, res){
    try {
      const id = req.id
      const response = await AuthService.logOut(id)
      return successResponse(res, null, 200, response.message)
    } catch (error) {
      return errorResponse(res, error.message, error.status)
    }
  }
}

module.exports = AuthController;
