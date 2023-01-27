const adminService = require('../services/admin.service');

const register = async (req, res, next) => {
  try {
    const user = await adminService.register(req.body);
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
