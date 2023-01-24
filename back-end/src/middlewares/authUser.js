const jwtUtils = require('../utils/jwt.utils');

const authUser = (req, _res, next) => {
  try {
    const token = req.header('Authorization');
    req.user = jwtUtils.verifyToken(token);
    return next();
  } catch (error) {
    error.name = 'UNAUTHORIZED';
    next(error);
  }
};

module.exports = authUser;