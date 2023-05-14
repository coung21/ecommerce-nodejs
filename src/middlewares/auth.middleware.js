const jwt = require('jsonwebtoken')
const keytokenModel = require('../models/keytoken.model')
const {UnauhthorizeRequest} = require('../utils/errRequest.utils')

async function authenticate(req, res, next){
  try {
    const token = req.headers.authorization.split(' ')[1]
    const userId = req.headers['x-client-id']
    if(!token || !userId){
      throw new UnauhthorizeRequest('Unauthorize')
    }
    const shopToken = await keytokenModel.findOne({user: userId})
    const publicKey = shopToken.publicKey
    const decode = jwt.verify(token, publicKey)
    req.id = decode.id
    next()
  } catch (error) {
    return error
  }
}

module.exports = authenticate
