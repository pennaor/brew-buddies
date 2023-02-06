const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require('sequelize');
const Sinon = require('sinon');
const productService = require('../../services/product.service');
const { allProducts } = require('../mocks/products.service.mocks');

describe('Testando Products Service', () => {
  it('Trazendo todos os produtos', async function () {
    Sinon.stub(Model, 'findAll').resolves(allProducts);

    const result = await productService.getAllProducts();

    expect(result).to.deep.equal(allProducts);

    Sinon.restore();
  });
});