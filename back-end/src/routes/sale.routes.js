const { Router } = require('express');
const { getSaleById } = require('../controllers/sale.controller');

const saleRouter = Router();
saleRouter.get('/sales/:id', getSaleById);

module.exports = saleRouter;
