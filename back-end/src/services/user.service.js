const md5 = require('md5');
const { User } = require('../database/models');
const jwtUtils = require('../utils/jwt.utils');

const getUser = async (email, password) => {
  const userData = await User.findOne({ where: { email, password: md5(password) } });
  if (!userData) {
    const error = new Error('User not found');
    error.name = 'NOT_FOUND';
    throw error;
  }

  const { password: _, ...userWithoutPassword } = userData.dataValues;
  const token = jwtUtils.generateToken(userWithoutPassword);
  return { user: userWithoutPassword, token };
};

module.exports = { getUser };
