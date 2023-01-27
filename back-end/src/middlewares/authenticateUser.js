const HttpException = require('../exceptions/HttpException');
const jwtUtils = require('../utils/jwt.utils');

const authenticateUser = (req, _res, next) => {
  try {
    const token = req.header('Authorization');
    req.user = jwtUtils.verifyToken(token);
    return next();
  } catch (error) {
    next(new HttpException(401, 'Token ausente ou inválido'));
  }
};

module.exports = authenticateUser;
