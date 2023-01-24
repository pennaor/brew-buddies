const express = require('express');
const errorManager = require('../middlewares/errorManager');
const loginRouter = require('../routes/login.routes');
const registerRouter = require('../routes/register.routes');
const enableCors = require('../middlewares/enableCors');
const productRouter = require('../routes/product.router');
require('express-async-errors');

const app = express();
app.use(enableCors);
app.use(express.json());
app.use(loginRouter);
app.use(registerRouter);
app.use(productRouter);

app.use(errorManager);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
