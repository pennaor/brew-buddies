const { Router } = require('express');
const { authenticate } = require('../controllers/user.controller');

const userRouter = Router();

userRouter.post('/login', authenticate);

module.exports = userRouter;
