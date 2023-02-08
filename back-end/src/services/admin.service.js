const md5 = require('md5');
const { Op } = require('sequelize');
const HttpException = require('../exceptions/HttpException');
const { User } = require('../database/models');
const { adminRegisterSchema, positiveIntegerSchema } = require('../joi/schemas');

const register = async (body) => {
  const { error } = adminRegisterSchema.validate(body);
  if (error) {
    throw new HttpException(400, error.message);
  }
  const { email, name, password, role } = body;

  const registeredUser = await User.findOne({ where: { [Op.or]: { email, name } } });
  if (registeredUser) {
    throw new HttpException(409, 'User already registered');
  }

  const { dataValues: { password: _, ...user } } = await User.create({
    name,
    email,
    password: md5(password),
    role,
  });

  return user;
};

const getAllUsers = async () => User.findAll({ attributes: { exclude: ['password'] } });

const deleteUser = async (id) => {
  const { error } = positiveIntegerSchema.label('id').validate(id);
  if (error) {
    throw new HttpException(400, error.message);
  }
  return User.destroy({ where: { id } });
};

module.exports = { register, getAllUsers, deleteUser };
