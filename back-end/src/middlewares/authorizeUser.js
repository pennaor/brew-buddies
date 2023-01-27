const HttpException = require('../exceptions/HttpException');

const authorizeUser = (req, _res, next) => {
  if (!req.user || req.user.role !== 'administrator') {
    return next(new HttpException(403, 'Forbidden'));
  }
  next();
};

module.exports = authorizeUser;