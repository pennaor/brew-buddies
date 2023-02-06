const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');
const HttpException = require('../../exceptions/HttpException');
const controllerParams = require('../mocks/controllerParams.mock');
const userController = require('../../controllers/user.controller');
const userService = require('../../services/user.service');
const { userWithToken, userEmail, userPassword, user, userName } = require('../mocks/user.test.mock');

describe('Verificação de funcionalidades do controller user', function () {
  it('"authenticate" deve responder com status code 200 e body com usuário e token',
  async function () {
    Sinon.stub(userService, 'authenticate').resolves(userWithToken);
    const { response, next } = controllerParams(Sinon);

    await userController.authenticate({ body: { email: userEmail, password: userPassword } }, response, next);

    expect(response.status.calledOnce).to.be.equal(true); 
    expect(response.status.getCall(0).args[0]).to.be.equal(200);
    expect(response.json.calledOnce).to.be.equal(true);
    expect(response.json.getCall(0).args[0]).to.be.deep.equal(userWithToken);
    expect(next.notCalled).to.be.equal(true);
  });

  it('"authenticate" ao "pegar" erro deve chamar next com o mesmo',
  async function () {
    Sinon.stub(userService, 'authenticate').throws(new HttpException(500, 'Server error'));
    const { response, next } = controllerParams(Sinon);

    await userController.authenticate({ body: { email: userEmail, password: userPassword } }, response, next);

    expect(response.status.notCalled).to.be.equal(true); 
    expect(response.json.notCalled).to.be.equal(true);
    expect(next.calledOnce).to.be.equal(true);
    expect(next.getCall(0).args[0]).to.be.instanceof(HttpException);
    expect(next.getCall(0).args[0].status).to.be.equal(500);
  });

  it('"register" deve responder com status code 201 e body com usuário criado',
  async function () {
    Sinon.stub(userService, 'register').resolves(user);
    const { response, next } = controllerParams(Sinon);

    await userController.register({ body: { name: userName, email: userEmail, password: userPassword } }, response, next);

    expect(response.status.calledOnce).to.be.equal(true); 
    expect(response.status.getCall(0).args[0]).to.be.equal(201);
    expect(response.json.calledOnce).to.be.equal(true);
    expect(response.json.getCall(0).args[0]).to.be.deep.equal(user);
    expect(next.notCalled).to.be.equal(true);
  });

  it('"register" ao "pegar" erro deve chamar next com o mesmo',
  async function () {
    Sinon.stub(userService, 'register').throws(new HttpException(500, 'Server error'));
    const { response, next } = controllerParams(Sinon);

    await userController.register({ body: { name: userName, email: userEmail, password: userPassword } }, response, next);

    expect(response.status.notCalled).to.be.equal(true); 
    expect(response.json.notCalled).to.be.equal(true);
    expect(next.calledOnce).to.be.equal(true);
    expect(next.getCall(0).args[0]).to.be.instanceof(HttpException);
    expect(next.getCall(0).args[0].status).to.be.equal(500);
  });

  afterEach(Sinon.restore);
});