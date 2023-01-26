const { Router } = require('express');
const { create } = require('../controllers/saleProduct.controller');
const authUser = require('../middlewares/authUser');

const saleProductRouter = Router();

saleProductRouter.post('/', authUser, create);

module.exports = saleProductRouter;
