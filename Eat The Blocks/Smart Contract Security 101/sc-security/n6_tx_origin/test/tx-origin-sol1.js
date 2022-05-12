const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reentrancy Problem", () => {
  let deployer, attacker, user;

  beforeEach(async () => {
    [deployer, attacker, user] = await ethers.getSigners();

    const SmallWalletSol1 = await ethers.getContractFactory(
      "SmallWalletSol1",
      deployer
    );
    this.smallWalletSol1 = await SmallWalletSol1.deploy();

    await deployer.sendTransaction({
      to: this.smallWalletSol1.address,
      value: 10000,
    });

    const AttackerProb = await ethers.getContractFactory(
      "AttackerProb",
      attacker
    );
    this.attackerProb = await AttackerProb.deploy(this.smallWalletSol1.address);
  });

  describe("SmallWalletSol1", () => {
    it("should accept deposits", async () => {
      expect(
        await ethers.provider.getBalance(this.smallWalletSol1.address)
      ).to.eq(10000);
    });
    it("should allow the owner to execute withdrawals", async () => {
      const initialUserBalance = await ethers.provider.getBalance(user.address);
      await this.smallWalletSol1.withdrawAll(user.address);
      expect(
        await ethers.provider.getBalance(this.smallWalletSol1.address)
      ).to.eq(0);
      expect(await ethers.provider.getBalance(user.address)).to.eq(
        initialUserBalance.add(10000)
      );
    });
    it("should revert if withdrawAll is called from any other account than the owner", async () => {
      await expect(
        this.smallWalletSol1.connect(attacker).withdrawAll(attacker.address)
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
        await ethers.provider.getBalance(this.smallWalletSol1.address)
      ).to.eq(0);
      expect(await ethers.provider.getBalance(attacker.address)).to.eq(
        initialAttackerBalance.add(10000)
      );
    });
  });
});
