const express = require('express');
const loginRouter = require('../routes/user.routes');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(loginRouter);

module.exports = app;
