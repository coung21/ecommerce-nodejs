const {
  product,
  clothing,
  electronics,
  books,
} = require('../models/product.model');
const { BadRequest } = require('../utils/errRequest.utils');
const { getData } = require('../utils/getData.utils');

class ProductFactory {
  static async createProduct(type, payload) {
    switch (type) {
      case 'Clothing':
        return new ClothingProduct(payload).createProduct();
      case 'Electronics':
        return new ElectronicsProduct(payload).createProduct();
      case 'Books':
        return new BooksProduct(payload).createProduct();
      default:
        throw new BadRequest(
          'Something went wrong - Cannot create new product'
        );
    }
  }
}

class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quanity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    (this.product_name = product_name),
      (this.product_thumb = product_thumb),
      (this.product_description = product_description);
    (this.product_price = product_price),
      (this.product_quanity = product_quanity),
      (this.product_type = product_type),
      (this.product_shop = product_shop),
      (this.product_attributes = product_attributes);
  }

  async createProduct(productId) {
    return await product.create({ ...this, _id: productId });
  }
}

class ElectronicsProduct extends Product {
  async createProduct() {
    const newElectronics = await electronics.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newElectronics) throw new BadRequest('Error');

    const newProduct = await super.createProduct(newElectronics._id);
    if (!newProduct) throw new BadRequest('Error');
    return getData({
      fields: [
        '_id',
        'product_name',
        'product_thumb',
        'product_description',
        'product_price',
        'product_quanity',
        'product_type',
        'product_shop',
        'product_attributes',
      ],
      object: newProduct,
    });
  }
}

class ClothingProduct extends Product {
  async createProduct() {
    const newClothing = await clothing.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newClothing) throw new BadRequest('Error');

    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) throw new BadRequest('Error');
    return getData({
      fields: [
        '_id',
        'product_name',
        'product_thumb',
        'product_description',
        'product_price',
        'product_quanity',
        'product_type',
        'product_shop',
        'product_attributes',
      ],
      object: newProduct,
    });
  }
}

class BooksProduct extends Product {
  async createProduct() {
    const newBooks = await books.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });
    if (!newBooks) throw new BadRequest('Error');

    const newProduct = await super.createProduct(newBooks._id);
    if (!newProduct) throw new BadRequest('Error');
    return getData({
      fields: [
        '_id',
        'product_name',
        'product_thumb',
        'product_description',
        'product_price',
        'product_quanity',
        'product_type',
        'product_shop',
        'product_attributes',
      ],
      object: newProduct,
    });
  }
}

module.exports = ProductFactory;
