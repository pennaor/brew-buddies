const express = require('express');
const errorManager = require('../middlewares/errorManager');
const enableCors = require('../middlewares/enableCors');
// const userRouter = require('../routes/user.routes');
// const productRouter = require('../routes/product.routes');
// const saleProductRouter = require('../routes/saleProduct.routes');
// const saleRouter = require('../routes/sale.routes');
// const sellerRouter = require('../routes/seller.routes');
// const customerRouter = require('../routes/customer.routes');
const routes = require('../routes');
require('express-async-errors');

const app = express();
app.use(express.static('public'));
app.use(enableCors);
app.use(express.json());
app.use(routes);
// app.use(productRouter);
// app.use(saleProductRouter);
// app.use(saleRouter);
// app.use(sellerRouter);
// app.use(customerRouter);

app.use(errorManager);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
