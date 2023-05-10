const mongoose = require('mongoose')

const DOCCUMENT = 'Key';
const COLLECTION = 'keys';

const keyTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Shop'
  },
  publicKey: {
    type: String,
    require: true,
  },
  privateKey: {
    type: String,
    require: true
  },
  refreshTokenUsed: {
    type: Array,
    default: []
  },
  refreshToken: {
    type: String,
    require: true
  }
}, {
  timestamps: true,
  collection: COLLECTION
})

module.exports = mongoose.model(DOCCUMENT, keyTokenSchema)