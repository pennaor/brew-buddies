const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');
const HttpException = require('../../exceptions/HttpException');
const controllerParams = require('../mocks/controllerParams.mock');
const sellerController = require('../../controllers/seller.controller');
const sellerService = require('../../services/seller.service');
const { sellerSales, seller } = require('../mocks/seller.service.mock');

describe('Verificação de funcionalidades do controller seller', function () {
  it('"getSalesBySellerId" em caso de sucesso deve responder com status code 200 e array com vendas do seller',
  async function () {
    Sinon.stub(sellerService, 'getSalesBySellerId').resolves(sellerSales);
    const { response, next } = controllerParams(Sinon);

    await sellerController.getSalesBySellerId({ params: { id: 5 } }, response, next);

    expect(response.status.calledOnce).to.be.equal(true); 
    expect(response.status.getCall(0).args[0]).to.be.equal(200);
    expect(response.json.calledOnce).to.be.equal(true);
    expect(response.json.getCall(0).args[0]).to.be.deep.equal(sellerSales);
    expect(next.notCalled).to.be.equal(true);
  });

  it('"getSalesBySellerId" ao "pegar" erro deve chamar next com o mesmo',
  async function () {
    Sinon.stub(sellerService, 'getSalesBySellerId').throws(new HttpException(500, 'Server error'));
    const { response, next } = controllerParams(Sinon);

    await sellerController.getSalesBySellerId({ params: { id: 5 } }, response, next);

    expect(response.status.notCalled).to.be.equal(true); 
    expect(response.json.notCalled).to.be.equal(true);
    expect(next.calledOnce).to.be.equal(true);
    expect(next.getCall(0).args[0]).to.be.instanceof(HttpException);
    expect(next.getCall(0).args[0].status).to.be.equal(500);
  });

  it('"getSellers" em caso de sucesso deve responder com status code 200 e array com todos os sellers',
  async function () {
    Sinon.stub(sellerService, 'getAllSellers').resolves(seller);
    const { response, next } = controllerParams(Sinon);

    await sellerController.getSellers({}, response, next);

    expect(response.status.calledOnce).to.be.equal(true); 
    expect(response.status.getCall(0).args[0]).to.be.equal(200);
    expect(response.json.calledOnce).to.be.equal(true);
    expect(response.json.getCall(0).args[0]).to.be.deep.equal(seller);
    expect(next.notCalled).to.be.equal(true);
  });

  it('"getSellers" ao "pegar" erro deve chamar next com o mesmo',
  async function () {
    Sinon.stub(sellerService, 'getAllSellers').throws(new HttpException(500, 'Server error'));
    const { response, next } = controllerParams(Sinon);

    await sellerController.getSellers({}, response, next);

    expect(response.status.notCalled).to.be.equal(true); 
    expect(response.json.notCalled).to.be.equal(true);
    expect(next.calledOnce).to.be.equal(true);
    expect(next.getCall(0).args[0]).to.be.instanceof(HttpException);
    expect(next.getCall(0).args[0].status).to.be.equal(500);
  });

  it('"getSellerById" em caso de sucesso deve responder com status code 200 e array com seller correspondente ao id',
  async function () {
    Sinon.stub(sellerService, 'getSellerById').resolves(seller);
    const { response, next } = controllerParams(Sinon);

    await sellerController.getSellerById({ params: { id: 5 }}, response, next);

    expect(response.status.calledOnce).to.be.equal(true); 
    expect(response.status.getCall(0).args[0]).to.be.equal(200);
    expect(response.json.calledOnce).to.be.equal(true);
    expect(response.json.getCall(0).args[0]).to.be.deep.equal(seller);
    expect(next.notCalled).to.be.equal(true);
  });

  it('"getSellerById" ao buscar por seller não existente deve "pegar" HttpException e chamar next com o mesmo',
  async function () {
    Sinon.stub(sellerService, 'getSellerById').throws(new HttpException(404, 'Seller not found'));
    const { response, next } = controllerParams(Sinon);

    await sellerController.getSellerById({ params: { id: 5 } }, response, next);

    expect(response.status.notCalled).to.be.equal(true); 
    expect(response.json.notCalled).to.be.equal(true);
    expect(next.calledOnce).to.be.equal(true);
    expect(next.getCall(0).args[0]).to.be.instanceof(HttpException);
    expect(next.getCall(0).args[0].status).to.be.equal(404);
    expect(next.getCall(0).args[0].message).to.be.equal('Seller not found');
  });

  afterEach(Sinon.restore);
});
