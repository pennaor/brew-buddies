const { expect } = require("chai");
const { describe } = require("mocha");
const jwtUtils = require("../../utils/jwt.utils");
const Sinon = require('sinon');
const authenticateUser = require('../../middlewares/authenticateUser');
const { user } = require("../mocks/user.test.mock");
const controllerParams = require('../mocks/controllerParams.mock');
const HttpException = require('../../exceptions/HttpException');

describe('Verifica middleware authenticateUser', function () {
  it('ao receber requisição com header e token válido, a função next deve ser chamada sem parâmetro. Entrada user no objeto de requisição deve ser criada',
  function () {
    const authenticRequest = {
      header: Sinon.spy(() => jwtUtils.generateToken(user)),
    };
    const { response, next } = controllerParams(Sinon);
    authenticateUser(authenticRequest, response, next);

    expect(authenticRequest.header.calledWith('Authorization')).to.be.true;
    expect(authenticRequest).to.haveOwnProperty('user');
    expect(authenticRequest.user).to.include(user);
    expect(next.calledWith()).to.be.true;
  });

  it('ao receber requisição com header contendo token inválido, a função next deve ser chamada com HttpException status 401',
  function () {
    const invalidRequest = {
      header: Sinon.spy(() => 'invalid token'),
    };
    const { response, next } = controllerParams(Sinon);
    authenticateUser(invalidRequest, response, next);

    expect(invalidRequest.header.calledWith('Authorization')).to.be.true;
    expect(invalidRequest).to.not.haveOwnProperty('user');
    expect(next.calledOnce).to.be.true;
    expect(next.getCall(0).args[0]).to.be.instanceof(HttpException);
    expect(next.getCall(0).args[0].status).to.be.equal(401);
    expect(next.getCall(0).args[0].message).to.be.equal('Token ausente ou inválido');
  });

  afterEach(Sinon.restore)
});
