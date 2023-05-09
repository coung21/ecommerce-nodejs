const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const generatePairTokens = require('../utils/generateTokens.utils');
const { getData } = require('../utils/getData.utils')
const { ROLES } = require('../constants/index');

class AuthService {

  //SignUp
  static async signUp(name, email, password) {
    try {
      const holderShop = await shopModel.findOne({ email: email }).lean();
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

      if (newShop) {
        //create publickey and private key
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
        });
        const publicKeyString = await keyTokenService.createKey({
          id: newShop._id,
          publicKey: publicKey,
        });
        if (!publicKeyString) {
          return { message: 'Cannot generate your key' };
        }
        //generate tokensPair
        const tokens = await generatePairTokens(
          { id: newShop._id, email: email },
          publicKeyString,
          privateKey
        );
        return tokens
          ? { shop: getData({fields: ['_id', 'name', 'email'], object: newShop }), tokens}
          : { message: 'Cannot signup - Something went wrong!' };

      } else {
        return { message: 'Cannot create shop accout - Something went wrong!' };
      }
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

//Login
  
}

module.exports = AuthService;
