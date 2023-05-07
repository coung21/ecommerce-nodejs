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
  refreshToken: {
    type: Array,
    default: []
  }
}, {
  timestamps: true,
  collection: COLLECTION
})

module.exports = mongoose.model(DOCCUMENT, keyTokenSchema)