const userService = require('../services/login.service');

const getUser = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const result = await userService.getUser(email, password);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser };
