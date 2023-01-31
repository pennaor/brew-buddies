const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require('sequelize');
const Sinon = require('sinon');
const HttpException = require('../../exceptions/HttpException');
const saleService = require('../../services/sale.service');
const {
  userId,
  newSaleId,
  invalidNewSalePayload,
  newSalePayload,
  saleSellerProducts,
  normalizedSaleSellerProducts
} = require('../mocks/sale.service.mock');

describe('Verificação de funcionalidades do serviço de sale', function () {
  it('"create" ao receber userId e informações de venda deve ser retornar o ID da venda criada',
  async function () {
    Sinon.stub(Model, 'create').resolves(newSaleId);

    const result = await saleService.create(userId, newSalePayload);

    expect(result).to.be.deep.equal(newSaleId);
  });

  it('"create" ao receber userId e informações de venda INVÁlIDAS deve lançar HttpException com status 400',
  async function () {
    Sinon.stub(Model, 'create').resolves(newSaleId);

    await saleService.create(userId, invalidNewSalePayload)
      .then(
        (result) => expect(result).to.not.be.ok,
        (error) => {
          expect(error).to.be.instanceof(HttpException);
          expect(error.status).to.be.equal(400);
        },
      );
  });

  it('"getSaleById" ao receber id de venda deve retornar informações da venda, sellerName e products associados',
  async function () {
    Sinon.stub(Model, 'findOne').resolves(saleSellerProducts);

    const result = await saleService.getSaleById(7);

    expect(result).to.be.deep.equal(normalizedSaleSellerProducts);
  });

  it('"getSaleById" ao receber id de venda inexistente deve lançar HttpException com status 404 e mensagem "Sale not found"',
  async function () {
    Sinon.stub(Model, 'findOne').resolves(null);

    await saleService.getSaleById(9999)
      .then(
        (result) => expect(result).to.not.be.ok,
        (error) => {
          expect(error).to.be.instanceof(HttpException);
          expect(error.status).to.be.equal(404);
          expect(error.message).to.be.equal('Sale not found');
        },
      );
  });

  it('"updateSaleStatus" ao receber id de venda e status válidos, não deve ter retorno',
  async function () {
    Sinon.stub(Model, 'update').resolves();

    const result = await saleService.updateSaleStatus(1, 'Pendente');

    expect(result).to.be.undefined;
  });

  it('"updateSaleStatus" ao receber id de venda e status INVÁLIDO, deve lançar HttpException com status 400',
  async function () {
    Sinon.stub(Model, 'update').resolves();

    await saleService.updateSaleStatus(1, 'statusinvalido')
      .then(
        (result) => expect(result).to.not.be.ok,
        (error) => {
          expect(error).to.be.instanceof(HttpException);
          expect(error.status).to.be.equal(400);
        },
      );
  });

  afterEach(Sinon.restore);
});
