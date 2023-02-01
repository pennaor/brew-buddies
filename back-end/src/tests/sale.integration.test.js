const chai = require('chai');
const { expect } = chai;
const { describe } = require('mocha');
const Sinon = require('sinon');
const chaiHttp = require('chai-http');
const { Model } = require('sequelize');
const app = require('../../api/app');
const { sellerSales } = require('../mocks/seller.service.mock');
const { saleSellerProducts, normalizedSaleSellerProducts } = require('../mocks/sale.service.mock');

chai.use(chaiHttp);

describe('Testes de integração de sales', function () {
  it('GET /orders/:id deve responder com status code 200 e sale associada ao id',
  async function () {
    Sinon.stub(Model, 'findOne').resolves(saleSellerProducts);

    const response = await chai.request(app)
      .get(`/orders/${sellerSales[0].id}`);
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(normalizedSaleSellerProducts);
  });

  it('PUT /orders/:id deve responder com status code 202 com body vazio',
  async function () {
    Sinon.stub(Model, 'update').resolves();

    const response = await chai.request(app)
      .put(`/orders/${sellerSales[0].id}`)
      .send({ status: 'Pendente' });
    
    expect(response.status).to.be.equal(202);
    expect(response.body).to.be.deep.equal({});
  });

  afterEach(Sinon.restore);
});