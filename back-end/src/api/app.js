const express = require('express');
const errorManager = require('../middlewares/errorManager');
const userRouter = require('../routes/user.routes');
const enableCors = require('../middlewares/enableCors');
const productRouter = require('../routes/product.routes');
const saleProductRouter = require('../routes/saleProduct.routes');
const saleRouter = require('../routes/sale.routes');
const sellerRouter = require('../routes/seller.routes');
require('express-async-errors');

const app = express();
app.use(express.static('public'));
app.use(enableCors);
app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(saleProductRouter);
app.use(saleRouter);
app.use(sellerRouter);

app.use(errorManager);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
