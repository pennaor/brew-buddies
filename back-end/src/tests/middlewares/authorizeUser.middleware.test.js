const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');
const jwtUtils = require('../../utils/jwt.utils');
const authorizeUser = require('../../middlewares/authorizeUser');
const controllerParams = require('../mocks/controllerParams.mock');
const HttpException = require('../../exceptions/HttpException');

const admin = {
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  role: 'administrator',
};

const customer = {
  id: 2,
  name: 'Fulano usuario',
  email: 'fulanousuario@gmail.com',
  role: 'customer',
};

describe('Verifica middleware authorizeUser', function () {
  it('ao receber requisição com header e token de administrador válido, a função next deve ser chamada sem parâmetro. Entrada user no objeto de requisição deve ser criada',
  function () {
    const authenticRequest = {
      header: Sinon.spy(() => jwtUtils.generateToken(admin)),
    };
    const { response, next } = controllerParams(Sinon);
    authorizeUser(authenticRequest, response, next);

    expect(authenticRequest.header.calledWith('Authorization')).to.be.true;
    expect(authenticRequest).to.haveOwnProperty('user');
    expect(authenticRequest.user).to.include(admin);
    expect(next.calledWith()).to.be.true;
  });

  it('ao receber requisição com header contendo token inválido, a função next deve ser chamada com HttpException status 401',
  function () {
    const invalidRequest = {
      header: Sinon.spy(() => 'invalid token'),
    };
    const { response, next } = controllerParams(Sinon);
    authorizeUser(invalidRequest, response, next);

    expect(invalidRequest.header.calledWith('Authorization')).to.be.true;
    expect(invalidRequest).to.not.haveOwnProperty('user');
    expect(next.calledOnce).to.be.true;
    expect(next.getCall(0).args[0]).to.be.instanceof(HttpException);
    expect(next.getCall(0).args[0].status).to.be.equal(401);
    expect(next.getCall(0).args[0].message).to.be.equal('Token ausente ou inválido');
  });

  it('ao receber requisição com header contendo token de usuário, a função next deve ser chamada com HttpException status 403 e mensagem "Forbidden"',
  function () {
    const invalidRequest = {
      header: Sinon.spy(() => jwtUtils.generateToken(customer)),
    };
    const { response, next } = controllerParams(Sinon);
    authorizeUser(invalidRequest, response, next);

    expect(invalidRequest.header.calledWith('Authorization')).to.be.true;
    expect(next.calledOnce).to.be.true;
    expect(next.getCall(0).args[0]).to.be.instanceof(HttpException);
    expect(next.getCall(0).args[0].status).to.be.equal(403);
    expect(next.getCall(0).args[0].message).to.be.equal('Forbidden');
  });

  afterEach(Sinon.restore);
});
