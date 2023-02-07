const chai = require('chai');
const Sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../api/app');
const productService = require('../../services/product.service');
const { allProducts } = require('../mocks/products.service.mocks');
const HttpException = require('../../exceptions/HttpException');

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota de GET /products', function () {
  it('Retorna status 200 e uma lista de produtos', async function () {
    Sinon.stub(productService, 'getAllProducts').resolves(allProducts);

    const httpResponse = await chai
      .request(app)
      .get('/products');

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(allProducts);
  });
  
  it('Caso retorne um erro', async function () {
    Sinon.stub(productService, 'getAllProducts').rejects(new HttpException(500, 'Internal Server Error'));

    const httpResponse = await chai
      .request(app)
      .get('/products');

    expect(httpResponse.status).to.equal(500);
    expect(httpResponse.body).to.deep.equal({ message: 'Internal Server Error' });
  });

  afterEach(Sinon.restore);
});
