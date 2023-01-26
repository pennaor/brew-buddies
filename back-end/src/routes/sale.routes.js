const { Router } = require('express');
const { getSaleById, getSalesByUserId } = require('../controllers/sale.controller');

const saleRouter = Router();
saleRouter.get('/orders/customer/:id', getSalesByUserId);
saleRouter.get('/orders/:id', getSaleById);

module.exports = saleRouter;
