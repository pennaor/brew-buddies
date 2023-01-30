const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require('sequelize');
const Sinon = require('sinon');
const HttpException = require('../../exceptions/HttpException');
const saleProductService = require('../../services/saleProduct.service');
const saleService = require('../../services/sale.service');
const { saleId, productsQuantities, invalidProductsQuantities } = require('../mocks/saleProduct.test.mock');

// const response = {
//   status: Sinon.spy().,
//   json: (json) => null,
//   end: () => null, 
// };


describe.skip('Verificação de funcionalidades do controller saleProduct', function () {
  beforeEach(() => {
    Sinon.stub(saleProductService, 'create').resolves([]);
    Sinon.stub(saleService, 'create').resolves({ id: saleId });
  })

  afterEach(Sinon.restore)
});
