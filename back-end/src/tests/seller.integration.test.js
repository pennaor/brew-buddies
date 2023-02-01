const chai = require('chai');
const { expect } = chai;
const { describe } = require('mocha');
const Sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Model } = require('sequelize');
const app = require('../../api/app');
const { sellerSales, seller } = require('../mocks/seller.service.mock');

chai.use(chaiHttp);

describe('Testes de integração de seller', function () {
  it('GET /sellers/:id/orders deve responder com status code 200 e sales associadas ao id de seller',
  async function () {
    Sinon.stub(Model, 'findAll').resolves(sellerSales);

    const response = await chai.request(app)
      .get(`/sellers/${seller[0].id}/orders`);
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(sellerSales);
  });

  it('GET /sellers/:id deve responder com status code 200 e seller',
  async function () {
    Sinon.stub(Model, 'findOne').resolves(seller[0]);

    const response = await chai.request(app)
      .get(`/sellers/${seller[0].id}`);
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(seller[0]);
  });

  it('GET /sellers deve responder com status code 200 e array com sellers',
  async function () {
    Sinon.stub(Model, 'findAll').resolves(seller);

    const response = await chai.request(app)
      .get(`/sellers`);
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(seller);
  });

  afterEach(Sinon.restore);
});