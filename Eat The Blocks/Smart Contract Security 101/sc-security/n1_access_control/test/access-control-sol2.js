const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Access Control Solution 2", () => {
  let deployer, attacker;

  beforeEach(async () => {
    [deployer, attacker] = await ethers.getSigners();
    const AgreedPriceSol2 = await ethers.getContractFactory(
      "AgreedPriceSol2",
      deployer
    );
    this.agreedPriceSol2 = await AgreedPriceSol2.deploy(100);
  });

  describe("AgreedPriceSol2", async () => {
    it("should set price at depolyment", async () => {
      expect(await this.agreedPriceSol2.price()).to.eq(100);
    });
    it("should set the deployer account as the owner at deplyment", async () => {
      expect(await this.agreedPriceSol2.owner()).to.eq(deployer.address);
    });
    it("should be possible for owner to change the price", async () => {
      await this.agreedPriceSol2.updatePrice(1000);
      expect(await this.agreedPriceSol2.price()).to.eq(1000);
    });
    it("should NOT be possible for other than owner to change the price", async () => {
      await expect(
        this.agreedPriceSol2.connect(attacker).updatePrice(1000)
      ).to.be.revertedWith("Restricted Access");
    });
    it("should be possible for owner to tranfer ownership", async () => {
      await this.agreedPriceSol2.changeOwner(user.address);
      expect(await this.agreedPriceSol2.owner()).to.eq(user.address);
    });
    it("should be possible for new owner to call updatePrice", async () => {
      await this.agreedPriceSol2.changeOwner(user.address);
      await this.agreedPriceSol2.connect(user).updatePrice(1090);
      expect(await this.agreedPriceSol2.price()).to.eq(1090);
    });
    it("should not be possible for other than owner to transfer ownership", async () => {
      await expect(
        this.agreedPriceSol2.connect(attacker).changeOwner(attacker.address)
      ).to.be.revertedWith("Restricted Access");
    });
  });
});
