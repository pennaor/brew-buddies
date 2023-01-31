const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');
const HttpException = require('../../exceptions/HttpException');
const saleProductController = require('../../controllers/saleProduct.controller');
const saleProductService = require('../../services/saleProduct.service');
const saleService = require('../../services/sale.service');
const { saleId } = require('../mocks/saleProduct.service.mock');
const controllerParams = require('../mocks/controllerParams.mock');
const { validRequest } = require('../mocks/saleProduct.controller.mock');

describe('Verificação de funcionalidades do controller saleProduct', function () {
  beforeEach(function () {
    Sinon.stub(saleService, 'create').resolves({ id: saleId });
  });

  it('"create" em caso de sucesso deve responder com status code 201 e body com saleId',
  async function () {
    Sinon.stub(saleProductService, 'create').resolves([]);
    const { response, next } = controllerParams(Sinon);

    await saleProductController.create(validRequest, response, next);

    expect(response.status.calledOnce).to.be.equal(true);
    expect(response.status.getCall(0).args[0]).to.be.equal(201);
    expect(response.json.calledOnce).to.be.equal(true);
    expect(response.json.getCall(0).args[0]).to.be.deep.equal({ saleId });
    expect(next.notCalled).to.be.equal(true);
  });

  it('"create" ao "pegar" erro deve chamar next com o mesmo',
  async function () {
    Sinon.stub(saleProductService, 'create').throws(new HttpException(400, 'validation error'));
    const { emptyRequest, response, next } = controllerParams(Sinon);

    await saleProductController.create(emptyRequest, response, next);

    expect(response.status.notCalled).to.be.equal(true);
    expect(response.json.notCalled).to.be.equal(true);
    expect(next.calledOnce).to.be.equal(true);
    expect(next.getCall(0).args[0]).to.include({ status: 400, message: 'validation error' });
  });

  afterEach(Sinon.restore);
});
