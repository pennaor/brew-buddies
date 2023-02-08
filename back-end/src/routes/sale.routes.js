const { Router } = require('express');
const { getSaleById, updateSaleStatus } = require('../controllers/sale.controller');

const saleRouter = Router();

saleRouter.get('/:id', getSaleById);
saleRouter.put('/:id', updateSaleStatus);

module.exports = saleRouter;
