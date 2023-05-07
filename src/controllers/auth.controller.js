const AuthService = require('../services/auth.service');

class AuthController {
  static async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const newShop = await AuthService.signUp(name, email, password);
      res.status(200).json(newShop);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
