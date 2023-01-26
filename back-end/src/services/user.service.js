const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');
const jwtUtils = require('../utils/jwt.utils');
const { loginSchema, registerSchema } = require('../joi/schemas');

const authenticate = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });

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
  delete userWithoutPassword.id;
  return { ...userWithoutPassword, token };
};

const register = async (name, email, password) => {
  const { error } = registerSchema.validate({ name, email, password });

  if (error) { error.name = 'BAD_REQUEST'; throw error; }
  const checkedUser = await User.findOne({ where: { [Op.or]: { email, name } } });

  if (checkedUser) {
    const err = new Error('User already registered');
    err.name = 'CONFLICT';
    throw err;
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
    const error = new Error('User not found');
    error.name = 'NOT_FOUND';
    throw error;
  }
  return user;
};

module.exports = { authenticate, getByName, register };
