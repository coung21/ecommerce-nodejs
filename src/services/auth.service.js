const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const {ROLES} = require('../constants/index')

class AuthService {
  static async signUp(name, email, password ) {
    try {
      const holderShop = await shopModel.findOne({ email: email })
      if (holderShop) {
        return {
          message: 'This Email Is Already Used',
        };
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [ROLES.Shop],
      });
      return newShop
    } catch (error) {
      return {
        error: error.message
      }
    }
  }
}

module.exports = AuthService;
