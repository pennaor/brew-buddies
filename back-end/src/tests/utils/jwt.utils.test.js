const { expect } = require('chai');
const { describe } = require('mocha');
const jwtUtils = require('../../utils/jwt.utils');
const { user } = require('../mocks/user.test.mock');

describe('Verifica funções de utils associadas ao JWT', function () {
  it('"generateToken" ao receber não receber payload válido deve lançar erro',
  async function () {
    try {
      const token = jwtUtils.generateToken();
      expect(token).to.be.undefined;
    } catch (error) {
      expect(error).to.be.instanceof(Error);
    }
  });

  it('"verifyToken" ao receber token inválido deve lançar erro',
  async function () {
    try {
      const payload = jwtUtils.verifyToken('');
      expect(payload).to.be.undefined;
    } catch (error) {
      expect(error).to.be.instanceof(Error);
    }
  });

  it('"generateToken" ao receber payload deve retornar token que será validado por "verifyToken"',
  async function () {
    try {
      const token = jwtUtils.generateToken(user);
      const payload = jwtUtils.verifyToken(token);
      expect(payload).to.include(user);
    } catch (error) {
      expect(error).to.be.undefined;
    }
  });
});
