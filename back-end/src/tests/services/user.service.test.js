const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require('sequelize');
const Sinon = require('sinon');

const userService = require('../../services/user.service');
const jwt = require('../../utils/jwt.utils');
const validUser = require('../mocks/user.test.mock');

describe.skip('Teste User Service', () => {
  it('Login com usuário válido', async () => {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc0NTgyNzYxLCJleHAiOjE2NzUxODc1NjF9.jojn3xl_Y8tEJjPKU2uwEpNCc1H1YlGPj_44ixQvn_A"
    
    Sinon.stub(Model, 'findOne').resolves(validUser);
    Sinon.stub(jwt, 'generateToken').returns(token);

    const result = await userService.getUser("adm@deliveryapp.com", '--adm2@21!!--');

    expect(result).to.deep.equal({
      "user": {
      "id": 1,
      "name": "Delivery App Admin",
      "email": "adm@deliveryapp.com",
      "role": "administrator"
    },
    "token": token
  });
  })

  it('Deve apresentar um erro com email inválido', async () => {
    const invalidEmail = 'Invalid fields';

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc0NTgyNzYxLCJleHAiOjE2NzUxODc1NjF9.jojn3xl_Y8tEJjPKU2uwEpNCc1H1YlGPj_44ixQvn_A"

      Sinon.stub(Model, 'findOne').resolves(validUser);
      Sinon.stub(jwt, 'generateToken').returns(token);
      try {
        await userService.getUser("adm@deliveryapp.com", '--adm2@21!!--');
      } catch (error) {
        expect(error.message).to.be.equal(invalidEmail);
      }
  })

  it('Deve apresentar um erro com senha inválida', async () => {
    const invalidPassword = 'Invalid password'; 

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjc0NTgyNzYxLCJleHAiOjE2NzUxODc1NjF9.jojn3xl_Y8tEJjPKU2uwEpNCc1H1YlGPj_44ixQvn_A"
    
    Sinon.stub(Model, 'findOne').resolves(validUser);
    Sinon.stub(jwt, 'generateToken').returns(token);

    let err = new Error('Invalid password');
    try {
      await userService.getUser("adm@deliveryapp.com", "invalidPassword")
    } catch (error) {
      err = error;
    }
    expect(err.message).to.be.equal(invalidPassword);
  });

  afterEach(Sinon.restore);
})