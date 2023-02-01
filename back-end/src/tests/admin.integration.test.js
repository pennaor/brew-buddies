const chai = require('chai');
const { expect } = chai;
const { describe } = require('mocha');
const Sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Model } = require('sequelize');
const app = require('../api/app');
const HttpException = require('../exceptions/HttpException');
const { user } = require('./mocks/user.test.mock');
const jwtUtils = require('../utils/jwt.utils');
const { newUser, createdUser } = require('./mocks/admin.service.mock');

chai.use(chaiHttp);

describe('Testes de integração de admin', function () {
  beforeEach(function () {
    Sinon.stub(jwtUtils, 'verifyToken').returns(user);
    Sinon.stub(console, 'error');
  });

  it('GET /admin/manage/users deve responder com status code 200 e todos usuários registrados',
  async function () {
    Sinon.stub(Model, 'findAll').resolves([user]);

    const response = await chai.request(app)
      .get('/admin/manage/users');
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal([user]);
  });

  it('DELETE /admin/manage/users/:id deve responder com status code 204 e body vazio',
  async function () {
    Sinon.stub(Model, 'destroy').resolves();

    const response = await chai.request(app)
      .delete('/admin/manage/users/3');
  
    expect(response.status).to.be.equal(204);
    expect(response.body).to.be.deep.equal({});
  });

  it('POST /admin/manage/users deve responder com status code 201 e body com dados do usuário criado',
  async function () {
    Sinon.stub(Model, "findOne").resolves();
    Sinon.stub(Model, "create").resolves(createdUser);
    const { password, ...rest } = createdUser;

    const response = await chai.request(app)
      .post('/admin/manage/register')
      .send(newUser);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(rest);
  });

  afterEach(Sinon.restore);
});