const mongoose = require('mongoose')

const DOCCUMENT = 'APIKEY'
const COLLECTION = 'apikeys'

const apiKeySchema = new mongoose.Schema({
  key: {
    type: String,
    require: true,
    unique: true,
  },
  status: {
    type: mongoose.Schema.Types.Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: COLLECTION
})

module.exports = mongoose.model(DOCCUMENT, apiKeySchema)