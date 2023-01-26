const { Router } = require('express');
const { getSaleById } = require('../controllers/sale.controller');

const saleRouter = Router();

saleRouter.get('/:id', getSaleById);

module.exports = saleRouter;
