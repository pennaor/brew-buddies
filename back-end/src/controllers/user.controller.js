const userService = require('../services/user.service');

const authenticate = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const result = await userService.authenticate(email, password);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const message = await userService.register(name, email, password);
    return res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate, register };
