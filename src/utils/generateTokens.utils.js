const jwt = require('jsonwebtoken')

const generatePairTokens = async (payload, publicKey, privateKey) => {
  const accessToken = await jwt.sign(payload, privateKey, {expiresIn: '2d', algorithm: 'RS256'})
  const refreshToken = await jwt.sign(payload, privateKey, {expiresIn: '7d', algorithm: 'RS256'})
  // console.log(accessToken, refreshToken)
  return {accessToken, refreshToken}
}

module.exports = generatePairTokens