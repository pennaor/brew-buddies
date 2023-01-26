const { Router } = require('express');
const { getSalesByCustomerId } = require('../controllers/customer.controller');

const customerRouter = Router();

customerRouter.get('/:id/orders', getSalesByCustomerId);

module.exports = customerRouter;