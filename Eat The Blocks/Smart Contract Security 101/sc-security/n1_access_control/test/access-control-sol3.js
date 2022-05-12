const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Access Control Solution 3", () => {
  let deployer, attacker, user;

  beforeEach(async () => {
    [deployer, attacker, user] = await ethers.getSigners();
    const AgreedPriceSol3 = await ethers.getContractFactory(
      "AgreedPriceSol3",
      deployer
    );
    this.agreedPriceSol3 = await AgreedPriceSol3.deploy(100);
  });

  describe("AgreedPriceSol3", async () => {
    it("should set price at depolyment", async () => {
      expect(await this.agreedPriceSol3.price()).to.eq(100);
    });
    it("should set the deployer account as the owner at deplyment", async () => {
      expect(await this.agreedPriceSol3.owner()).to.eq(deployer.address);
    });
    it("should be possible for owner to change the price", async () => {
      await this.agreedPriceSol3.updatePrice(1000);
      expect(await this.agreedPriceSol3.price()).to.eq(1000);
    });
    it("should NOT be possible for other than owner to change the price", async () => {
      await expect(
        this.agreedPriceSol3.connect(attacker).updatePrice(1000)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("should be possible for owner to tranfer ownership", async () => {
      await this.agreedPriceSol3.transferOwnership(user.address);
      expect(await this.agreedPriceSol3.owner()).to.eq(user.address);
    });
    it("should be possible for new owner to call updatePrice", async () => {
      await this.agreedPriceSol3.transferOwnership(user.address);
      await this.agreedPriceSol3.connect(user).updatePrice(1090);
      expect(await this.agreedPriceSol3.price()).to.eq(1090);
    });
    it("should not be possible for other than owner to transfer ownership", async () => {
      await expect(
        this.agreedPriceSol3
          .connect(attacker)
          .transferOwnership(attacker.address)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
