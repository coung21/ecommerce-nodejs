const apiKeyModel = require('../models/apiKey.model');

const apiKeyMiddleware = async (req, res, next) => {
  const { key } = req.query
  const holderKey = await apiKeyModel.findOne({key: key})
  if(!holderKey || holderKey.status === false){
    return res.status('403').json({
      success: false,
      status_message: 'Invalid api key',
    });
  } else {
    return next()
  }
}

module.exports = { apiKeyMiddleware }