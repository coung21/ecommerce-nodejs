const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const keyTokenService = require('./keyToken.service');
const generatePairTokens = require('../utils/generateTokens.utils');
const { getData } = require('../utils/getData.utils');
const { ROLES } = require('../constants/index');
const {
  ConflictRequest,
  BadRequest,
  IntervalServerErr,
  UnauhthorizeRequest,
  ForbiddenRequest
} = require('../utils/errRequest.utils');
const jwt = require('jsonwebtoken')
class AuthService {
  //SignUp
  static async signUp(name, email, password) {
    const holderShop = await shopModel.findOne({ email: email }).lean();
    if (holderShop) {
      throw new ConflictRequest('This email is already used');
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
        refreshToken: tokens.refreshToken,
      });
      return {
        ...getData({
          fields: ['_id', 'name', 'email', 'status', 'roles'],
          object: newShop,
        }),
        tokens,
      };
    } else {
      throw new IntervalServerErr('Cannot sign up - Something went wrongg');
    }
  }

  //Login
  static async logIn(email, password) {
    const foundShop = await shopModel.findOne({ email: email });
    if (!foundShop) {
      throw new BadRequest('This account is not exist');
    }
    const passwordIsMatch = await bcrypt.compare(password, foundShop.password);
    if (passwordIsMatch) {
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

      const tokens = await generatePairTokens(
        { id: foundShop._id, email: email },
        privateKey
      );
      await keyTokenService.createKey({
        id: foundShop._id,
        publicKey: publicKey,
        privateKey: privateKey,
        refreshToken: tokens.refreshToken,
      });

      return {
        ...getData({
          fields: ['_id', 'name', 'status', 'roles'],
          object: foundShop,
        }),
        tokens,
      };
    } else {
      throw new BadRequest('Incorrect password');
    }
  }

  //LogOut
  static async logOut(id) {
    if (!id) {
      throw new UnauhthorizeRequest('Invalid request');
    }
    const delKey = await keyTokenService.delKey(id);
    return delKey;
  }

  static async refreshTokenHandler(refreshToken){
    const foundToken = await keyTokenService.checkUsedToken(refreshToken)
    if(foundToken){
      const {id, email} = await jwt.verify(refreshToken, foundToken.publicKey)
      await keyTokenService.delKey(id)
      throw new ForbiddenRequest('Something went wrong - ReLogin')
    }
    
    const holderToken = await keyTokenService.findByRefreshToken(refreshToken)
    if(!holderToken){
      throw new ConflictRequest('Shop is not registered')
    }
    const {id, email} = jwt.verify(refreshToken, holderToken.publicKey)
    const foundShop = await shopModel.findOne({_id: id, email: email})
    console.log(foundShop)
    if (!foundShop) {
      throw new ConflictRequest('Shop is not registered');
    }
    const tokens = await generatePairTokens({id: id, email: email}, holderToken.privateKey)

    await holderToken.updateOne({
      $set: {
        refreshToken: tokens.refreshToken
      },
      $addToSet:{
        refreshTokenUsed: refreshToken
      }
    })

    return {
      user: {id, email},
      tokens
    }
  }
}
module.exports = AuthService;
