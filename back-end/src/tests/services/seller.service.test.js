const { expect } = require("chai");
const { describe } = require("mocha");
const { Model } = require("sequelize");
const Sinon = require("sinon");

const sellerService = require("../../services/seller.service");
const { seller, sellerSale} = require("../mocks/seller.service.mock");

describe("Teste Seller Service", () => {
    
  it("Encontra todos os sellers", async () => {
    const findAllSellers = Sinon.stub(Model, "findAll").resolves(seller);
    await sellerService.getAllSellers();

    expect(findAllSellers.calledWith(seller));
  });

  it("Encontra um seller pelo id", async () => {
    const findOneSeller = Sinon.stub(Model, "findOne").resolves(seller);
    await sellerService.getSellerById(seller.id);

    expect(findOneSeller.calledWith({ where: { id: 1 } }));
  });

  it("Encontra uma sale pelo id do seller", async () => {
    const findOneSeller = Sinon.stub(Model, "findAll").resolves(sellerSale);
    await sellerService.getSalesBySellerId(seller.id);

    expect(findOneSeller.calledWith({ where: { sellerId: 2 } }));
  });

  afterEach(Sinon.restore);
});
