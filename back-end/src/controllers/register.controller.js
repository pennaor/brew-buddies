const { registerUser } = require('../services/register.service');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const message = await registerUser(name, email, password);
    return res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

module.exports = { register };