const { expect } = require('chai');
const { describe } = require('mocha');
const Sinon = require('sinon');
const errorManager = require('../../middlewares/errorManager');
const controllerParams = require('../mocks/controllerParams.mock');
const HttpException = require('../../exceptions/HttpException');

describe('Verifica middleware errorManager', function () {
  beforeEach(function () {
    Sinon.stub(console, 'error');
  });

  it('ao receber erro do tipo HttpException, response deve chamar status e json passando as informações do erro',
  function () {
    const httpException = new HttpException(404, 'Not found');
    const { response } = controllerParams(Sinon);

    errorManager(httpException, {}, response);

    expect(response.status.calledOnce).to.be.true;
    expect(response.status.calledWith(httpException.status)).to.be.true;
    expect(response.json.calledOnce).to.be.true;
    expect(response.json.getCall(0).args[0]).to.be.deep.equal({ message: httpException.message });
  });

  it('ao receber objeto genérico, response deve chamar status com 500 e json com "Something went wrong"',
  function () {
    const exception = {};
    const { response } = controllerParams(Sinon);

    errorManager(exception, {}, response);

    expect(response.status.calledOnce).to.be.true;
    expect(response.status.calledWith(500)).to.be.true;
    expect(response.json.calledOnce).to.be.true;
    expect(response.json.getCall(0).args[0]).to.be.deep.equal({ message: 'Something went wrong' });
  });

  afterEach(Sinon.restore);
});
