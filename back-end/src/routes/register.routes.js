const { Router } = require('express');
const { register } = require('../controllers/register.controller');

const registerRouter = Router();

registerRouter.post('/register', register);

module.exports = registerRouter;