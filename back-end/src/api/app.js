const express = require('express');
const errorManager = require('../middlewares/errorManager');
const loginRouter = require('../routes/user.routes');
const registerRouter = require('../routes/register.routes');
const enableCors = require('../middlewares/enableCors');
require('express-async-errors');

const app = express();
app.use(enableCors)
app.use(express.json());
app.use(loginRouter);
app.use(registerRouter);

app.use(errorManager);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
