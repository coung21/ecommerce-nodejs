const keyTokenModel = require('../models/keytoken.model')

class keyTokenService{
  static async createKey({id, publicKey}){
    try {
      const publicKeyString = publicKey.toString()
      const tokens = await keyTokenModel.create({
        user: id,
        publicKey: publicKeyString
      })

      return tokens ? tokens.publicKey : null
    } catch (error) {
      return {error: error.message}
    }
  }
}

module.exports = keyTokenService