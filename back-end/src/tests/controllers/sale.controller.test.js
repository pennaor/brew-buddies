const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');
const HttpException = require('../../exceptions/HttpException');
const saleController = require('../../controllers/sale.controller');
const saleService = require('../../services/sale.service');
const controllerParams = require('../mocks/controllerParams.mock');
const { validRequest, invalidRequest } = require('../mocks/sale.controller.mock');
const { normalizedSaleSellerProducts } = require('../mocks/sale.service.mock');

const validationErrorMessage = 'validation error';

describe('Verificação de funcionalidades do controller de sale', function () {
  it('"getSaleById" em caso de sucesso deve responder com status code 200 e body com venda, sellerName e produtos',
  async function () {
    Sinon.stub(saleService, 'getSaleById').resolves(normalizedSaleSellerProducts);
    const { response, next } = controllerParams(Sinon);

    await saleController.getSaleById(validRequest, response, next);

    expect(response.status.calledOnce).to.be.equal(true);
    expect(response.status.getCall(0).args[0]).to.be.equal(200);
    expect(response.json.calledOnce).to.be.equal(true);
    expect(response.json.getCall(0).args[0]).to.be.deep.equal(normalizedSaleSellerProducts);
    expect(next.notCalled).to.be.equal(true);
  });

  it('"getSaleById" ao "pegar" erro deve chamar next com o mesmo',
  async function () {
    Sinon.stub(saleService, 'getSaleById').throws(new HttpException(400, validationErrorMessage));
    const { response, next } = controllerParams(Sinon);

    await saleController.getSaleById(invalidRequest, response, next);

    expect(response.status.notCalled).to.be.equal(true);
    expect(response.json.notCalled).to.be.equal(true);
    expect(next.calledOnce).to.be.equal(true);
    expect(next.getCall(0).args[0]).to.include({ status: 400, message: validationErrorMessage });
  });

  it('"updateSaleStatus" em caso de sucesso deve responder com status code 202 sem body',
  async function () {
    Sinon.stub(saleService, 'updateSaleStatus').resolves();
    const { response, next } = controllerParams(Sinon);

    await saleController.updateSaleStatus(validRequest, response, next);

    expect(response.status.calledOnce).to.be.equal(true);
    expect(response.status.getCall(0).args[0]).to.be.equal(202);
    expect(response.end.calledOnce).to.be.equal(true);
    expect(response.json.notCalled).to.be.equal(true);
    expect(next.notCalled).to.be.equal(true);
  });

  it('"updateSaleStatus" ao "pegar" erro deve chamar next com o mesmo',
  async function () {
    Sinon.stub(saleService, 'updateSaleStatus').throws(new HttpException(400, validationErrorMessage));
    const { response, next } = controllerParams(Sinon);

    await saleController.updateSaleStatus(invalidRequest, response, next);

    expect(response.status.notCalled).to.be.equal(true);
    expect(response.json.notCalled).to.be.equal(true);
    expect(next.calledOnce).to.be.equal(true);
    expect(next.getCall(0).args[0]).to.include({ status: 400, message: validationErrorMessage });
  });

  afterEach(Sinon.restore);
});
