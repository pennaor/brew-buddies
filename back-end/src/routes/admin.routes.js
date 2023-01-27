const { Router } = require('express');
const { register } = require('../controllers/admin.controller');
const authenticateUser = require('../middlewares/authenticateUser');
const authorizeUser = require('../middlewares/authorizeUser');

const adminRouter = Router();

adminRouter.post('/register', authenticateUser, authorizeUser, register);

module.exports = adminRouter;
