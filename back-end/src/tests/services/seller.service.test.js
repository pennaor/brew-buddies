const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require('sequelize');
const Sinon = require('sinon');

const HttpException = require('../../exceptions/HttpException');
const sellerService = require('../../services/seller.service');
const { seller, sellerSales } = require('../mocks/seller.service.mock');

describe('Teste Seller Service', () => {
  it('Encontra todos os sellers', async function () {
    const findAllSellers = Sinon.stub(Model, 'findAll').resolves(seller);
    await sellerService.getAllSellers();

    expect(findAllSellers.calledWith(seller));
  });

  it('Encontra um seller pelo id', async function () {
    const findOneSeller = Sinon.stub(Model, 'findOne').resolves(seller);
    await sellerService.getSellerById(seller.id);

    expect(findOneSeller.calledWith({ where: { id: 1 } }));
  });

  it('Encontra uma sale pelo id do seller', async function () {
    const findOneSeller = Sinon.stub(Model, 'findAll').resolves(sellerSales);
    await sellerService.getSalesBySellerId(seller.id);

    expect(findOneSeller.calledWith({ where: { sellerId: 2 } }));
  });

  it('Verifica se caso o seller não exista é lançado um HttpException com status 404 e message "Seller not found"', async function () {
    Sinon.stub(Model, 'findOne').resolves(null);
    await sellerService.getSellerById(seller.id)
      .then(
        (result) => expect(result).not.be.ok,
        (error) => {
          expect(error).to.be.instanceof(HttpException);
          expect(error.status).to.be.equal(404);
          expect(error.message).to.be.equal('Seller not found');
        },
      );
  });
 
  afterEach(Sinon.restore);
});
