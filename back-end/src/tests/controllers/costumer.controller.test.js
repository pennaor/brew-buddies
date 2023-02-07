const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');
const HttpException = require('../../exceptions/HttpException');
const controllerParams = require('../mocks/controllerParams.mock');
const customerController = require('../../controllers/customer.controller');
const customerService = require('../../services/customer.service');
const { customerSale } = require('../mocks/customer.service.mock');

describe('Verificação de funcionalidades do controller costumer', function () {
  it('"getSalesByCustomerId" em caso de sucesso deve responder com status code 200 e array com compras do costumer',
  async function () {
    Sinon.stub(customerService, 'getSalesByCustomerId').resolves(customerSale);
    const { response, next } = controllerParams(Sinon);

    await customerController.getSalesByCustomerId({ params: { id: 5 } }, response, next);

    expect(response.status.calledOnce).to.be.equal(true); 
    expect(response.status.getCall(0).args[0]).to.be.equal(200);
    expect(response.json.calledOnce).to.be.equal(true);
    expect(response.json.getCall(0).args[0]).to.be.deep.equal(customerSale);
    expect(next.notCalled).to.be.equal(true);
  });

  it('"getSalesByCustomerId" ao "pegar" erro deve chamar next com o mesmo',
  async function () {
    Sinon.stub(customerService, 'getSalesByCustomerId').throws(new HttpException(500, 'Server error'));
    const { response, next } = controllerParams(Sinon);

    await customerController.getSalesByCustomerId({ params: { id: 5 } }, response, next);

    expect(response.status.notCalled).to.be.equal(true); 
    expect(response.json.notCalled).to.be.equal(true);
    expect(next.calledOnce).to.be.equal(true);
    expect(next.getCall(0).args[0]).to.be.instanceof(HttpException);
    expect(next.getCall(0).args[0].status).to.be.equal(500);
  });

  afterEach(Sinon.restore);
});
