const { Router } = require('express');
const { authenticate, register } = require('../controllers/user.controller');

const userRouter = Router();

userRouter.post('/login', authenticate);
userRouter.post('/register', register);

module.exports = userRouter;
