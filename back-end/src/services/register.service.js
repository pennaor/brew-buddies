const md5 = require('md5');
const { User } = require('../database/models');

const registerUser = async (name, email, password) => {
  const checkedUser = await User.findOne({ where: { email, name } });
  
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

module.exports = { registerUser };