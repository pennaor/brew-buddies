const { Router } = require('express');
const { create } = require('../controllers/saleProduct.controller');
const authenticateUser = require('../middlewares/authenticateUser');

const saleProductRouter = Router();

saleProductRouter.post('/', authenticateUser, create);

module.exports = saleProductRouter;
