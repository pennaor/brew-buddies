const chai = require('chai');
const { expect } = chai;
const { describe } = require('mocha');
const Sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Model } = require('sequelize');
const app = require('../api/app');
const HttpException = require('../exceptions/HttpException');
const { userToken, userWithToken, validUser, user } = require('./mocks/user.test.mock');
const jwtUtils = require('../utils/jwt.utils');

chai.use(chaiHttp);

describe('Testes de integração de user', function () {
  beforeEach(function () {
    Sinon.stub(console, 'error');
  });

  it('POST /login ao receber credenciais de usuário válidas deve responder com status code 200 e body com dados do usuário e token',
  async function () {
    Sinon.stub(Model, 'findOne').resolves(validUser);
    Sinon.stub(jwtUtils, 'generateToken').returns(userToken);

    const response = await chai.request(app)
      .post('/login')
      .send({ email: 'userx@email.com', password: '123456789' });
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(userWithToken);
  });

  it('POST /login ao receber e-mail de usuário inválido deve responder com status code 400 e mensagem de erro',
  async function () {
    Sinon.stub(Model, 'findOne').resolves(validUser);
    Sinon.stub(jwtUtils, 'generateToken').returns(userToken);

    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'invalidemail',
        password: '123456789',
      });
    
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"email" must be a valid email'});
  });

  it('POST /register ao receber dados de usuário deve responder status 201 e body com os dados e id',
  async function () {
    Sinon.stub(Model, 'findOne').resolves(null);
    Sinon.stub(Model, 'create').resolves(validUser);

    const response = await chai.request(app)
      .post('/register')
      .send({
        name: 'Cara dos testes br',
        email: 'caradostestes@gmail.com',
        password: '123456789',
      });
    
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(validUser);
  });

  afterEach(Sinon.restore);
});