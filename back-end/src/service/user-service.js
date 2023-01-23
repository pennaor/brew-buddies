const { User } = require("../database/models");
const jwtUtils = require("../utils/jwt.utils");

const getUser = async (email, password) => {
  const userData = await User.findOne({ where: { email } });

  if (!userData) throw new Error("User not found");

  if (userData && userData.password === password) {
    const { password: _, ...userWithoutPassword } = userData.dataValues;
    const token = jwtUtils.generateToken(userWithoutPassword)
    return { token };
  }

  throw new Error("Invalid fields");
};

module.exports = { getUser };
