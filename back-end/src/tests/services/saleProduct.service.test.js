const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require('sequelize');
const Sinon = require('sinon');
const HttpException = require('../../exceptions/HttpException');
const saleProductService = require('../../services/saleProduct.service');
const { saleId, productsQuantities, saleIdProductsQuantities, invalidProductsQuantities } = require('../mocks/saleProduct.test.mock');


describe('Verificação de funcionalidades do serviço saleProduct', function () {
  beforeEach(() => {
    Sinon.stub(Model, 'create')
    .onFirstCall().resolves(saleIdProductsQuantities[0])
    .onSecondCall().resolves(saleIdProductsQuantities[1])
    .onThirdCall().resolves(saleIdProductsQuantities[2]);
  })

  it('"create" ao receber uma saleId, produtos e quantidade, deve ser retornado as entradas de saleProduct criadas', async function () {
    const saleAndProducts = await saleProductService.create(saleId, productsQuantities);
    expect(saleAndProducts).to.be.deep.equal(saleAndProducts);
  });

  it('"create" ao receber um array de produtos inválido deve lançar um erro do tipo HttpException com status code 400', async function () {
    await saleProductService.create(saleId, invalidProductsQuantities)
      .then(
        (result) => expect(result).not.be.ok,
        (result) => expect(result).to.be.instanceof(HttpException),
      );
  });

  afterEach(Sinon.restore)
});
