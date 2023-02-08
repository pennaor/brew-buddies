const { Router } = require('express');
const productRouter = require('./product.routes');
const saleProductRouter = require('./saleProduct.routes');
const saleRouter = require('./sale.routes');
const sellerRouter = require('./seller.routes');
const customerRouter = require('./customer.routes');
const userRouter = require('./user.routes');
const adminRouter = require('./admin.routes');

const routes = Router();

routes.use('/products', productRouter);
routes.use('/orders_products', saleProductRouter);
routes.use('/orders', saleRouter);
routes.use('/sellers', sellerRouter);
routes.use('/customer', customerRouter);
routes.use('/admin/manage', adminRouter);
routes.use(userRouter);

module.exports = routes;
