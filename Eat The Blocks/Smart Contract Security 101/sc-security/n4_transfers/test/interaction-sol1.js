const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Savings Account Problem", () => {
  let deployer, user;

  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners();
    const SavingAccountsSol1 = await ethers.getContractFactory(
      "SavingAccountsSol1",
      deployer
    );
    this.savingAccountsSol1 = await SavingAccountsSol1.deploy();
    const InvestorProb = await ethers.getContractFactory(
      "InvestorProb",
      deployer
    );
    this.investorAccountsProb = await InvestorProb.deploy(
      this.savingAccountsSol1.address
    );
  });

  describe("From an EOA", () => {
    it("should be possible to deposit", async () => {
      expect(await this.savingAccountsSol1.balanceOf(user.address)).to.eq(0);
      await this.savingAccountsSol1.connect(user).deposit({ value: 100 });
      expect(await this.savingAccountsSol1.balanceOf(user.address)).to.eq(100);
    });
    it("should be possible to withdraw", async () => {
      expect(await this.savingAccountsSol1.balanceOf(user.address)).to.eq(0);
      await this.savingAccountsSol1.connect(user).deposit({ value: 100 });
      expect(await this.savingAccountsSol1.balanceOf(user.address)).to.eq(100);
      await this.savingAccountsSol1.connect(user).withdraw();
      expect(await this.savingAccountsSol1.balanceOf(user.address)).to.eq(0);
    });
  });

  describe("From a Contract", () => {
    it("should be possible to deposit", async () => {
      expect(
        await this.savingAccountsSol1.balanceOf(
          this.investorAccountsProb.address
        )
      ).to.eq(0);
      await this.investorAccountsProb.depositIntoSavingsAccount({ value: 100 });
      expect(
        await this.savingAccountsSol1.balanceOf(
          this.investorAccountsProb.address
        )
      ).to.eq(100);
    });
    it("should be possible to withdraw", async () => {
      expect(
        await this.savingAccountsSol1.balanceOf(
          this.investorAccountsProb.address
        )
      ).to.eq(0);
      await this.investorAccountsProb.depositIntoSavingsAccount({ value: 100 });
      expect(
        await this.savingAccountsSol1.balanceOf(
          this.investorAccountsProb.address
        )
      ).to.eq(100);
      await this.investorAccountsProb.withdrawFromSavingsAccount();
      expect(
        await this.savingAccountsSol1.balanceOf(
          this.investorAccountsProb.address
        )
      ).to.eq(0);
    });
  });
});
