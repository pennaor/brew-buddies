const { Router } = require('express');
const { getAllProducts } = require('../controllers/product.controller');

const productRouter = Router();
productRouter.get('/customer/products', getAllProducts);

module.exports = productRouter;