const chai = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Model } = require('sequelize');
const app = require('../api/app');
const { validRequest } = require('./mocks/saleProduct.controller.mock');
const { saleIdProductsQuantities } = require('./mocks/saleProduct.service.mock');
const { user } = require('./mocks/user.test.mock');
const jwtUtils = require('../utils/jwt.utils');

const { expect } = chai;
chai.use(chaiHttp);

const newSaleId = 7;

describe('Testes de integração de saleProduct', function () {
  it('POST /orders_products deve responder com status code 201 e saleId da venda criada',
  async function () {
    Sinon.stub(Model, 'create')
    .onCall(0)
      .resolves({ id: newSaleId })
    .onCall(1)
      .resolves(saleIdProductsQuantities[0])
    .onCall(2)
      .resolves(saleIdProductsQuantities[1])
    .onCall(3)
      .resolves(saleIdProductsQuantities[2]);
    Sinon.stub(jwtUtils, 'verifyToken').returns(user);

    const response = await chai.request(app)
      .post('/orders_products')
      .send(validRequest.body);
    
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal({ saleId: newSaleId });
  });
});
