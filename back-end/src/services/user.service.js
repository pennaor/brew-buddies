const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');
const jwtUtils = require('../utils/jwt.utils');
const { loginSchema, registerSchema } = require('../joi/schemas');
const HttpException = require('../exceptions/HttpException');

const authenticate = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    throw new HttpException(400, error.message);
  } 

  const userData = await User.findOne({ where: { email, password: md5(password) } });
  if (!userData) {
    throw new HttpException(404, 'User not found');
  }

  const { password: _, ...userWithoutPassword } = userData.dataValues;
  const token = jwtUtils.generateToken(userWithoutPassword);
  delete userWithoutPassword.id;
  return { ...userWithoutPassword, token };
};

const register = async (name, email, password) => {
  const { error } = registerSchema.validate({ name, email, password });
  if (error) {
    throw new HttpException(400, error.message);
  }

  const checkedUser = await User.findOne({ where: { [Op.or]: { email, name } } });
  if (checkedUser) {
    throw new HttpException(409, 'User already registered');
  }

  const user = await User.create({
    name,
    email,
    password: md5(password),
    role: 'customer',
  });
  delete user.dataValues.password;
  return user;
};

const getByName = async (name) => {
  const user = await User.findOne({ where: { name } });
  if (!user) {
    throw new HttpException(404, 'User not found');
  }
  return user;
};

module.exports = { authenticate, getByName, register };
