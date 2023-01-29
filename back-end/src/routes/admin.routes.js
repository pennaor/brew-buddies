const { Router } = require('express');
const { register, getAllUsers, deleteUser } = require('../controllers/admin.controller');
const authorizeUser = require('../middlewares/authorizeUser');

const adminRouter = Router();

adminRouter.post('/register', authorizeUser, register);
adminRouter.get('/users', authorizeUser, getAllUsers);
adminRouter.delete('/users/:id', authorizeUser, deleteUser);

module.exports = adminRouter;
