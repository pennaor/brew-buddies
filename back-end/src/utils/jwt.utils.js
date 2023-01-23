require('dotenv/config');

const jwt = require('jsonwebtoken');

const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..', '..', 'jwt.evaluation.key');

const secretToken = fs.readFileSync(dir, { encoding: 'utf8', flag: 'r' });

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (token) => jwt.sign(token, secretToken, jwtConfig);
const verifyToken = async (token) => {
  try {
    const verToken = await jwt.verify(token, secretToken);
    return verToken;
  } catch (_e) {
    return { type: 401 };
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
