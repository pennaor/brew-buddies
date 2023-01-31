const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');
const HttpException = require('../../exceptions/HttpException');
const controllerParams = require('../mocks/controllerParams.mock');
const adminController = require('../../controllers/admin.controller');
const adminService = require('../../services/admin.service');
const { newUser, createdUser, users } = require('../mocks/admin.service.mock');

describe('Verificação de funcionalidades do controller admin', function () {
  it('"register" deve responder com status code 201 e body com usuário criado',
  async function () {
    Sinon.stub(adminService, 'register').resolves(createdUser);
    const { response, next } = controllerParams(Sinon);

    await adminController.register({ body: newUser }, response, next);

    expect(response.status.calledOnce).to.be.equal(true); 
    expect(response.status.getCall(0).args[0]).to.be.equal(201);
    expect(response.json.calledOnce).to.be.equal(true);
    expect(response.json.getCall(0).args[0]).to.be.deep.equal(createdUser);
    expect(next.notCalled).to.be.equal(true);
  });

  it('"register" ao "pegar" erro deve chamar next com o mesmo',
  async function () {
    Sinon.stub(adminService, 'register').throws(new HttpException(500, "Server error"));
    const { response, next } = controllerParams(Sinon);

    await adminController.register({ body: newUser }, response, next);

    expect(response.status.notCalled).to.be.equal(true); 
    expect(response.json.notCalled).to.be.equal(true);
    expect(next.calledOnce).to.be.equal(true);
    expect(next.getCall(0).args[0]).to.be.instanceof(HttpException);
    expect(next.getCall(0).args[0].status).to.be.equal(500);
  })

  it('"getAllUsers" em caso de sucesso deve responder com status code 200 e array com todos os usuários',
  async function () {
    Sinon.stub(adminService, 'getAllUsers').resolves(users);
    const { response, next } = controllerParams(Sinon);

    await adminController.getAllUsers({}, response, next);

    expect(response.status.calledOnce).to.be.equal(true); 
    expect(response.status.getCall(0).args[0]).to.be.equal(200);
    expect(response.json.calledOnce).to.be.equal(true);
    expect(response.json.getCall(0).args[0]).to.be.deep.equal(users);
    expect(next.notCalled).to.be.equal(true);
  });

  it('"getAllUsers" ao "pegar" erro deve chamar next com o mesmo',
  async function () {
    Sinon.stub(adminService, 'getAllUsers').throws(new HttpException(500, 'Server error'));
    const { response, next } = controllerParams(Sinon);

    await adminController.getAllUsers({}, response, next);

    expect(response.status.notCalled).to.be.equal(true); 
    expect(response.json.notCalled).to.be.equal(true);
    expect(next.calledOnce).to.be.equal(true);
    expect(next.getCall(0).args[0]).to.be.instanceof(HttpException);
    expect(next.getCall(0).args[0].status).to.be.equal(500);
  });

  it('"deleteUser" em caso de sucesso deve responder com status code 204 sem body',
  async function () {
    Sinon.stub(adminService, 'deleteUser').resolves();
    const { response, next } = controllerParams(Sinon);

    await adminController.deleteUser({ params: { id: 5 }}, response, next);

    expect(response.status.calledOnce).to.be.equal(true); 
    expect(response.status.getCall(0).args[0]).to.be.equal(204);
    expect(response.json.notCalled).to.be.equal(true);
    expect(response.end.calledOnce).to.be.equal(true);
    expect(next.notCalled).to.be.equal(true);
  });

  it('"deleteUser" em caso de sucesso deve responder com status code 204 sem body',
  async function () {
    Sinon.stub(adminService, 'deleteUser').throws(new HttpException(500, 'Server error'));
    const { response, next } = controllerParams(Sinon);

    await adminController.deleteUser({ params: { id: 5 }}, response, next);

    expect(response.status.notCalled).to.be.equal(true); 
    expect(response.json.notCalled).to.be.equal(true);
    expect(response.end.notCalled).to.be.equal(true);
    expect(next.calledOnce).to.be.equal(true);
    expect(next.getCall(0).args[0]).to.be.instanceof(HttpException);
    expect(next.getCall(0).args[0].status).to.be.equal(500);
  });

  afterEach(Sinon.restore);
});