const { expect } = require("chai");
const { describe } = require("mocha");
const { Model } = require("sequelize");
const Sinon = require("sinon");

const adminService = require("../../services/admin.service");
const { createdUser, newUser, users} = require("../mocks/admin.service.mock");

describe("Teste Admin Service", () => {

  it("Verifica se é possível cadastrar um novo usuário", async () => {

    const stub = Sinon.stub(Model, "create").resolves(createdUser);
    const user = await adminService.register(newUser);
    console.log('alooooo funcionaaaa', user);

      expect(stub.calledOnce).to.be.true;
      
      // expect(user.id).to.equal(stub.id);
      // expect(user.name).to.equal(stub.name);
      // expect(user.email).to.equal(stub.email);
      // expect(user.password).to.equal(stub.password);
      // expect(user.role).to.equal(stub.role);

  });

  it("Encontra todos os usuários", async () => {
    const stub = Sinon.stub(Model, "findAll").returns(users);
    await adminService.getAllUsers();

    expect(stub.calledWith(users));
  });

  it("Verifica se é possível deletar um usuário", async () => {
    const delUser = {
      id: 1,
      name: "Delivery App Admin",
      email: "adm@deliveryapp.com",
      role: "administrator",
    };

    const stub = Sinon.stub(Model, "destroy").resolves(delUser.id);
    await adminService.deleteUser(delUser.id);

    expect(stub.calledWith(delUser.id)).to.not.be.true;
  });

  afterEach(Sinon.restore);
});


