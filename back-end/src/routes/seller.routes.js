const { Router } = require('express');
const { getSellers, getSellerById } = require('../controllers/seller.controller');

const sellerRouter = Router();

sellerRouter.get('/sellers/:id', getSellerById);
sellerRouter.get('/sellers', getSellers);

module.exports = sellerRouter;