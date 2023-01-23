const { Router } = require('express');
const { getUser } = require('../controller/user.controller')

const loginRouter = Router();

loginRouter.post('/login', getUser);

module.exports = loginRouter;
