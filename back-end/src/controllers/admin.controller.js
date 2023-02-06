const adminService = require('../services/admin.service');

const register = async (req, res, next) => {
  try {
    const user = await adminService.register(req.body);
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    await adminService.deleteUser(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = { register, getAllUsers, deleteUser };
