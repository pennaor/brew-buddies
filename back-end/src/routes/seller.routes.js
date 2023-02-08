const { Router } = require('express');
const { 
  getSellers,
  getSellerById,
  getSalesBySellerId,
} = require('../controllers/seller.controller');

const sellerRouter = Router();

sellerRouter.get('/:id/orders', getSalesBySellerId);
sellerRouter.get('/:id', getSellerById);
sellerRouter.get('/', getSellers);

module.exports = sellerRouter;