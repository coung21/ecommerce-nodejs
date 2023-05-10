const keyTokenModel = require('../models/keytoken.model')

class keyTokenService{
  static async createKey({id, publicKey, privateKey, refreshToken}){
    try {
      const tokens = await keyTokenModel.findOneAndUpdate(
        { user: id },
        { user: id, publicKey: publicKey.toString(), privateKey: privateKey, refreshToken: refreshToken},
        {new:true, upsert: true}
      );
      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }
}

module.exports = keyTokenService