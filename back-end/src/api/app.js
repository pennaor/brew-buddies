const express = require('express');
const errorManager = require('../middlewares/errorManager');
const userRouter = require('../routes/user.routes');
const registerRouter = require('../routes/register.routes');
const enableCors = require('../middlewares/enableCors');
const productRouter = require('../routes/product.router');
const saleProductRouter = require('../routes/saleProduct.router');
const saleRouter = require('../routes/sale.routes');
require('express-async-errors');

const app = express();
app.use(express.static('public'));
app.use(enableCors);
app.use(express.json());
app.use(userRouter);
app.use(registerRouter);
app.use(productRouter);
app.use(saleProductRouter);
app.use(saleRouter);

app.use(errorManager);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
