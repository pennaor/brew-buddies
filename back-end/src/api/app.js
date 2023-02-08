const express = require('express');
const errorManager = require('../middlewares/errorManager');
const enableCors = require('../middlewares/enableCors');
const routes = require('../routes');
require('express-async-errors');

const app = express();
app.use(express.static('public'));
app.use(enableCors);
app.use(express.json());
app.use(routes);

app.use(errorManager);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
