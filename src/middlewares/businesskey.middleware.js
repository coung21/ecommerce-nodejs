const apiKeyModel = require('../models/apiKey.model');
const { ForbiddenRequest } = require('../utils/errRequest.utils');

const apiKeyMiddleware = async (req, res, next) => {
  try {
    const { key } = req.query;
    const holderKey = await apiKeyModel.findOne({ key: key });
    if (!holderKey || holderKey.status === false) {
      throw new ForbiddenRequest('Invalid api key');
    } else {
      return next();
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { apiKeyMiddleware };
