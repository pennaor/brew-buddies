const { Router } = require('express');
const { register, getAllUsers, deleteUser } = require('../controllers/admin.controller');
const authorizeUser = require('../middlewares/authorizeUser');

const adminRouter = Router();

adminRouter.delete('/users/:id', authorizeUser, deleteUser);
adminRouter.get('/users', authorizeUser, getAllUsers);
adminRouter.post('/register', authorizeUser, register);

module.exports = adminRouter;
