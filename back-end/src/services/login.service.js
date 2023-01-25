const md5 = require('md5');
const { User } = require('../database/models');
const jwtUtils = require('../utils/jwt.utils');
const { loginSchema } = require('../joi/schemas');

const getUser = async (email, password) => {
  const { error } = loginSchema.validate({
    email,
    password,
  });

  if (error) {
    const err = new Error(error.message);
    err.name = 'BAD_REQUEST';
    throw err; 
  } 

  const userData = await User.findOne({ where: { email, password: md5(password) } });
  if (!userData) {
    const err = new Error('User not found');
    err.name = 'NOT_FOUND';
    throw err;
  }

  const { password: _, ...userWithoutPassword } = userData.dataValues;
  const token = jwtUtils.generateToken(userWithoutPassword);
  delete userWithoutPassword.id
  return { ...userWithoutPassword, token };
};

module.exports = { getUser };
