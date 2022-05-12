const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Access Control Problem", () => {
  let deployer, attacker, user;

  beforeEach(async () => {
    [deployer, attacker, user] = await ethers.getSigners();
    const AgreedPriceProb = await ethers.getContractFactory(
      "AgreedPriceProb",
      deployer
    );
    this.agreedPriceProb = await AgreedPriceProb.deploy(100);
  });

  describe("AgreedPriceProb", async () => {
    it("should set price at depolyment", async () => {
      expect(await this.agreedPriceProb.price()).to.eq(100);
    });
    it("should be possible for anyone to change price", async () => {
      await this.agreedPriceProb.connect(attacker).updatePrice(1000);
      expect(await this.agreedPriceProb.price()).to.eq(1000);
    });
  });
});
