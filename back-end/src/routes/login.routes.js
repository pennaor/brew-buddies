const { Router } = require('express');
const { getUser } = require('../controllers/login.controller');

const loginRouter = Router();

loginRouter.post('/login', getUser);

module.exports = loginRouter;
