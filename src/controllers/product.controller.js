const ProductService = require('../services/product.service')
const {successResponse, errorResponse} = require('../utils/responseApi.utils')

class ProductController{
  static async createProduct(req, res){
    try {
      const newProduct = await ProductService.createProduct(
        req.body.product_type,
        { ...req.body, product_shop: req.id }
      );
      return successResponse(res, newProduct, 201, 'create new product successfully')
    } catch (error) {
      return errorResponse(res, error.message, error.status)
    }
  }
}

module.exports = ProductController