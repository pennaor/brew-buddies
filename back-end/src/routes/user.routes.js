const { Router } = require('express');
const { getUser } = require('../controllers/user.controller');

const loginRouter = Router();

loginRouter.post('/login', getUser);

module.exports = loginRouter;
