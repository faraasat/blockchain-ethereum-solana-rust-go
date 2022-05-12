const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Access Control Solution 1", () => {
  let deployer, attacker;

  beforeEach(async () => {
    [deployer, attacker, user] = await ethers.getSigners();
    const AgreedPriceSol1 = await ethers.getContractFactory(
      "AgreedPriceSol1",
      deployer
    );
    this.agreedPriceSol1 = await AgreedPriceSol1.deploy(100);
  });

  describe("AgreedPriceSol1", async () => {
    it("should set price at depolyment", async () => {
      expect(await this.agreedPriceSol1.price()).to.eq(100);
    });
    it("should set the deployer account as the owner at deplyment", async () => {
      expect(await this.agreedPriceSol1.owner()).to.eq(deployer.address);
    });
    it("should be possible for owner to change the price", async () => {
      await this.agreedPriceSol1.updatePrice(1000);
      expect(await this.agreedPriceSol1.price()).to.eq(1000);
    });
    it("should NOT be possible for other than owner to change the price", async () => {
      await expect(
        this.agreedPriceSol1.connect(attacker).updatePrice(1000)
      ).to.be.revertedWith("Restricted Access");
    });
  });
});
