const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require('sequelize');
const Sinon = require('sinon');
const HttpException = require('../../exceptions/HttpException');
const userService = require('../../services/user.service');
const jwt = require('../../utils/jwt.utils');
const { userToken, userWithToken, validUser, newUser, invalidUser, newUserInstance } = require('../mocks/user.test.mock');

describe('Teste User Service', () => {
  beforeEach(function () {
    Sinon.stub(jwt, 'generateToken').returns(userToken);
  });

  it('Login com usuário válido', async function () {
    Sinon.stub(Model, 'findOne').resolves(validUser);

    const result = await userService.authenticate('adm@deliveryapp.com', '--adm2@21!!--');

    expect(result).to.deep.equal(userWithToken);
  });

  it('Deve apresentar um erro com email inválido', async function () {
    Sinon.stub(Model, 'findOne').resolves(validUser);

    await userService.authenticate('adm@', '--adm2@21!!--')
      .then(
        (result) => expect(result).to.not.be.ok,
        (error) => {
          expect(error).to.be.instanceof(HttpException);
          expect(error.status).to.be.equal(400);
        },
      );
  });

  it('Deve apresentar um erro com senha inválida', async function () {
    Sinon.stub(Model, 'findOne').resolves(null);

    await userService.authenticate('adm@deliveryapp.com', 'senhainvalida')
    .then(
      (result) => expect(result).to.not.be.ok,
      (error) => {
        expect(error).to.be.instanceof(HttpException);
        expect(error.status).to.be.equal(404);
        expect(error.message).to.be.equal('User not found');
      },
    );
  });

  it('Verifica se é possível cadastrar um novo usuário', async function () {
    const { email, name, password } = newUser;
    Sinon.stub(Model, 'findOne').resolves(null);
    const stub = Sinon.stub(Model, 'create').resolves(newUserInstance);

    const result = await userService.register(name, email, password);

    expect(stub.calledOnce).to.be.true;

    expect(result.id).to.equal(newUser.id);
    expect(result.name).to.equal(newUser.name);
    expect(result.email).to.equal(newUser.email);
    expect(result.role).to.equal(newUser.role);
  });

  it('Verifica se é possível cadastrar um novo usuário com e-mail inválido', async function () {
    const { name, password } = newUser;
    const { email } = invalidUser;
    Sinon.stub(Model, 'findOne').resolves(null);
    Sinon.stub(Model, 'create').resolves(validUser);

    await userService.register(name, email, password)
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
    const { email, name, password } = newUser;
    Sinon.stub(Model, 'findOne').resolves({});
    Sinon.stub(Model, 'create').resolves(newUserInstance);

    await userService.register(name, email, password)
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