const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reentrancy Problem", () => {
  let deployer, attacker, user;

  beforeEach(async () => {
    [deployer, attacker, user] = await ethers.getSigners();

    const SmallWalletProb = await ethers.getContractFactory(
      "SmallWalletProb",
      deployer
    );
    this.smallWalletProb = await SmallWalletProb.deploy();

    await deployer.sendTransaction({
      to: this.smallWalletProb.address,
      value: 10000,
    });

    const AttackerProb = await ethers.getContractFactory(
      "AttackerProb",
      attacker
    );
    this.attackerProb = await AttackerProb.deploy(this.smallWalletProb.address);
  });

  describe("SmallWalletProb", () => {
    it("should accept deposits", async () => {
      expect(
        await ethers.provider.getBalance(this.smallWalletProb.address)
      ).to.eq(10000);
    });
    it("should allow the owner to execute withdrawals", async () => {
      const initialUserBalance = await ethers.provider.getBalance(user.address);
      await this.smallWalletProb.withdrawAll(user.address);
      expect(
        await ethers.provider.getBalance(this.smallWalletProb.address)
      ).to.eq(0);
      expect(await ethers.provider.getBalance(user.address)).to.eq(
        initialUserBalance.add(10000)
      );
    });
    it("should revert if withdrawAll is called from any other account than the owner", async () => {
      await expect(
        this.smallWalletProb.connect(attacker).withdrawAll(attacker.address)
      ).to.be.revertedWith("Caller not authorized");
    });
  });
  describe("AttackerProb", () => {
    it("should drain the victim out if smartWallet's owner send ether", async () => {
      const initialAttackerBalance = await ethers.provider.getBalance(
        attacker.address
      );
      await deployer.sendTransaction({
        to: this.attackerProb.address,
        value: 1,
      });
      expect(
        await ethers.provider.getBalance(this.smallWalletProb.address)
      ).to.eq(0);
      expect(await ethers.provider.getBalance(attacker.address)).to.eq(
        initialAttackerBalance.add(10000)
      );
    });
  });
});
