const mongoose = require('mongoose')

const DOCCUMENT = 'Shop'
const COLLECTION = 'shops'

const shopSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true,
    trim: true,
  },
  email:{
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: true
  },
  status:{
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  verify:{
    type: mongoose.Schema.Types.Boolean,
    default: false
  },
  roles: {
    type: Array,
    default: []
  }
},
{
  timestamps: true,
  collection: COLLECTION
})

module.exports = mongoose.model(DOCCUMENT, shopSchema)