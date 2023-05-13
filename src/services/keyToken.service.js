const keyTokenModel = require('../models/keytoken.model')

class keyTokenService{
  static async createKey({id, publicKey, privateKey, refreshToken}){
      const tokens = await keyTokenModel.findOneAndUpdate(
        { user: id },
        { user: id, publicKey: publicKey.toString(), privateKey: privateKey, refreshToken: refreshToken},
        {new:true, upsert: true}
      );
      return tokens ? tokens.publicKey : null
  }

  static async delKey(id){
    return await keyTokenModel.deleteOne({user: id})
  }

  static async checkUsedToken(refreshToken){
    return await keyTokenModel.findOne({refreshTokenUsed: refreshToken})
  }

  static async findByRefreshToken(refreshToken){
    return await keyTokenModel.findOne({refreshToken: refreshToken})
  }
}

module.exports = keyTokenService