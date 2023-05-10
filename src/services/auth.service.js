const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const generatePairTokens = require('../utils/generateTokens.utils');
const { getData } = require('../utils/getData.utils')
const { ROLES } = require('../constants/index');
const {ConflictRequest, BadRequest, IntervalServerErr} = require('../utils/errRequest.utils')

class AuthService {

  //SignUp
  static async signUp(name, email, password) {
      const holderShop = await shopModel.findOne({ email: email }).lean();
      if (holderShop) {
        throw new ConflictRequest('This email is already used')
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
        //generate tokensPair
        const tokens = await generatePairTokens(
          { id: newShop._id, email: email },
          privateKey
          );

          await keyTokenService.createKey({
            id: newShop._id,
            publicKey: publicKey,
            privateKey: privateKey,
            refreshToken: tokens.refreshToken
          });
          return {...getData({fields: ['_id', 'name', 'email', 'status', 'roles'], object: newShop }), tokens}


      } else {
        throw new IntervalServerErr('Cannot sign up - Something went wrongg')
      }
  }

//Login
  static async logIn(email, password){
    const foundShop = await shopModel.findOne({email: email})
    if(!foundShop){
      return new BadRequest('This account is not exist')
    }
    const passwordIsMatch = await bcrypt.compare(password, foundShop.password)
    if(passwordIsMatch){
      const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'pkcs1',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs1',
          format: 'pem'
        }
      })

      const tokens = await generatePairTokens({id: foundShop._id, email: email}, privateKey)

      await keyTokenService.createKey({id: foundShop._id, publicKey: publicKey, privateKey: privateKey, refreshToken: tokens.refreshToken})

      return {...getData({fields: ['_id', 'name', 'status', 'roles'], object: foundShop}), tokens}
    } else {
      return new BadRequest('Incorrect password')
    }
  }
}

module.exports = AuthService;
