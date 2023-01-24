const productService = require('../services/product.service');

const getAllProducts = async (req, res, next) => {
  try {
    const product = await productService.getAllProducts();
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllProducts };
