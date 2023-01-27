const md5 = require('md5');
const { Op } = require('sequelize');
const HttpException = require('../exceptions/HttpException');
const { User } = require('../database/models');
const { adminRegister } = require('../joi/schemas');

const register = async (body) => {
  const { error } = adminRegister.validate(body);
  if (error) {
    throw new HttpException(400, error.message);
  }
  const { email, name, password, role } = body;

  const checkedUser = await User.findOne({ where: { [Op.or]: { email, name } } });
  if (checkedUser) {
    throw new HttpException(409, 'User already registered');
  }

  const user = await User.create({
    name,
    email,
    password: md5(password),
    role,
  }, { raw: true });
  delete user.password;
  return user;
};

module.exports = { register };
