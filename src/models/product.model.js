const mongoose = require('mongoose')

const DOCCUMENT = 'Product';
const COLLECTION = 'product';

const productSchema = new mongoose.Schema({
  product_name: {type: String, require: true},
  product_thumb: {type: String, require: true},
  product_description: {type: String},
  product_price: {type: Number, require: true},
  product_quanity: {type: Number, require: true},
  product_type: {type: String, enum: ['Electronics', 'Clothing', 'Books']},
  product_shop: {type: mongoose.Schema.Types.ObjectId, ref: 'Shop'},
  product_attributes: {type: mongoose.Schema.Types.Mixed, require: true}
}, {
  collection: COLLECTION,
  timestamps: true
})

const clothingSchema = new mongoose.Schema({
  brand: {type: String, require: true},
  size: {type: String, require: true},
  material: {type: String, require: true},
})

const electronicSchema = new mongoose.Schema({
  brand: {type: String, require: true},
  model: {type: String, require: true},
  color: {type: String, require: true},
})

const bookSchema = new mongoose.Schema({
  author: {type: String, require: true},
  release_date: {type: mongoose.Schema.Types.Date, require: true},
  language: {type: String, require: true},
})

module.exports = {
  product: mongoose.model(DOCCUMENT, productSchema),
  clothing: mongoose.model('Clothing', clothingSchema),
  electronics: mongoose.model('Electronics', electronicSchema),
  books: mongoose.model('Books', bookSchema)
}