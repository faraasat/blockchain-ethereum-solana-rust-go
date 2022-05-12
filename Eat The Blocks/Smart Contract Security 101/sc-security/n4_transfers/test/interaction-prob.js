const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Savings Account Problem", () => {
  let deployer, user;

  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners();
    const SavingAccountsProb = await ethers.getContractFactory(
      "SavingAccountsProb",
      deployer
    );
    this.savingAccountsProb = await SavingAccountsProb.deploy();
    const InvestorProb = await ethers.getContractFactory(
      "InvestorProb",
      deployer
    );
    this.investorAccountsProb = await InvestorProb.deploy(
      this.savingAccountsProb.address
    );
  });

  describe("From an EOA", () => {
    it("should be possible to deposit", async () => {
      expect(await this.savingAccountsProb.balanceOf(user.address)).to.eq(0);
      await this.savingAccountsProb.connect(user).deposit({ value: 100 });
      expect(await this.savingAccountsProb.balanceOf(user.address)).to.eq(100);
    });
    it("should be possible to withdraw", async () => {
      expect(await this.savingAccountsProb.balanceOf(user.address)).to.eq(0);
      await this.savingAccountsProb.connect(user).deposit({ value: 100 });
      expect(await this.savingAccountsProb.balanceOf(user.address)).to.eq(100);
      await this.savingAccountsProb.connect(user).withdraw();
      expect(await this.savingAccountsProb.balanceOf(user.address)).to.eq(0);
    });
  });

  describe("From a Contract", () => {
    it("should be possible to deposit", async () => {
      expect(
        await this.savingAccountsProb.balanceOf(
          this.investorAccountsProb.address
        )
      ).to.eq(0);
      await this.investorAccountsProb.depositIntoSavingsAccount({ value: 100 });
      expect(
        await this.savingAccountsProb.balanceOf(
          this.investorAccountsProb.address
        )
      ).to.eq(100);
    });
    it("should be possible to withdraw", async () => {
      expect(
        await this.savingAccountsProb.balanceOf(
          this.investorAccountsProb.address
        )
      ).to.eq(0);
      await this.investorAccountsProb.depositIntoSavingsAccount({ value: 100 });
      expect(
        await this.savingAccountsProb.balanceOf(
          this.investorAccountsProb.address
        )
      ).to.eq(100);
      await this.investorAccountsProb.withdrawFromSavingsAccount();
      expect(
        await this.savingAccountsProb.balanceOf(
          this.investorAccountsProb.address
        )
      ).to.eq(0);
    });
  });
});
