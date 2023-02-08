const HttpException = require('../exceptions/HttpException');
const jwtUtils = require('../utils/jwt.utils');

const authorizeUser = (req, _res, next) => {
  try {
    const token = req.header('Authorization');
    req.user = jwtUtils.verifyToken(token);
  } catch (error) {
    return next(new HttpException(401, 'Token ausente ou inválido'));
  }

  if (req.user.role !== 'administrator') {
    return next(new HttpException(403, 'Forbidden'));
  }
  next();
};

module.exports = authorizeUser;
