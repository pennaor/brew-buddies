const userService = require("../service/user-service");

const md5 = require('md5');

const getUser = async (req, res) => {
  const { email, password } = req.body;
  const md5Password = md5(password);

  try {
    const user = await userService.getUser(email, md5Password);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = { getUser }
