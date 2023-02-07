const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require('sequelize');
const Sinon = require('sinon');
const HttpException = require('../../exceptions/HttpException');
const adminService = require('../../services/admin.service');
const { createdUser, users, delUser, invalidUser } = require('../mocks/admin.service.mock');
const { newUserInstance, newUser } = require('../mocks/user.test.mock');

describe('Teste Admin Service', () => {
  it('Verifica se é possível cadastrar um novo usuário', async function () {
    const stub = Sinon.stub(Model, 'create').resolves(newUserInstance);
    const user = await adminService.register(newUser);

    expect(stub.calledOnce).to.be.true;
    expect(user.id).to.equal(newUser.id);
    expect(user.name).to.equal(newUser.name);
    expect(user.email).to.equal(newUser.email);
    expect(user.role).to.equal(newUser.role);
  });

  it('Encontra todos os usuários', async function () {
    const stub = Sinon.stub(Model, 'findAll').returns(users);
    await adminService.getAllUsers();

    expect(stub.calledWith(users));
  });

  it('Verifica se é possível deletar um usuário', async function () {
    const stub = Sinon.stub(Model, 'destroy').resolves(delUser.id);
    await adminService.deleteUser(delUser.id);

    expect(stub.calledWith(delUser.id)).to.not.be.true;
  });

  it('Verifica se o id do usuário é valido', async function () {
    Sinon.stub(Model, 'destroy').resolves(delUser.id);
    await adminService.deleteUser('s1')
      .then(
        (result) => expect(result).not.be.ok,
        (error) => {
          expect(error).to.be.instanceof(HttpException);
          expect(error.status).to.be.equal(400);
          expect(error.message).to.be.equal('"id" must be a number');
        },
      );
  });

  it('Verifica se ao tentar registrar usuário inválido é lançado um erro', async function () {
    Sinon.stub(Model, 'create').resolves(createdUser);
    await adminService.register(invalidUser)
      .then(
        (result) => expect(result).not.be.ok,
        (error) => {
          expect(error).to.be.instanceof(HttpException);
          expect(error.status).to.be.equal(400);
          expect(error.message).to.be.equal('"email" must be a valid email');
        },
      );
  });

  it('Verifica se ao tentar registrar usuário existente é lançado um erro', async function () {
    Sinon.stub(Model, 'findOne').resolves({});
    Sinon.stub(Model, 'create').resolves(createdUser);

    await adminService.register(newUser)
      .then(
        (result) => expect(result).not.be.ok,
        (error) => {
          expect(error).to.be.instanceof(HttpException);
          expect(error.status).to.be.equal(409);
          expect(error.message).to.be.equal('User already registered');
        },
      );
  });
 
  afterEach(Sinon.restore);
});
