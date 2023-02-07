const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require('sequelize');
const Sinon = require('sinon');

const customeService = require('../../services/customer.service');
const { customer, customerSale } = require('../mocks/customer.service.mock');

describe('Teste Customer Service', () => {
  it('Encontra uma sale pelo id do customer', async function () {
    const findOneSeller = Sinon.stub(Model, 'findAll').resolves(customerSale);
    await customeService.getSalesByCustomerId(customer.id);

    expect(findOneSeller.calledWith({ where: { userId: 3 } }));
    Sinon.restore();
  });
});
