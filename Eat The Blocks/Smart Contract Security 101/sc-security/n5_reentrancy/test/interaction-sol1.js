const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reentrancy Sol1", () => {
  let deployer, user, attacker;

  beforeEach(async () => {
    [deployer, user, attacker] = await ethers.getSigners();
    const SavingAccountsV2Sol1 = await ethers.getContractFactory(
      "SavingAccountsV2Sol1",
      deployer
    );
    this.savingAccountsV2Sol1 = await SavingAccountsV2Sol1.deploy();

    this.savingAccountsV2Sol1.deposit({
      value: ethers.utils.parseEther("100"),
    });
    this.savingAccountsV2Sol1
      .connect(user)
      .deposit({ value: ethers.utils.parseEther("50") });

    const InvestorV2Sol1 = await ethers.getContractFactory(
      "InvestorV2Sol1",
      attacker
    );
    this.investorV2Sol1 = await InvestorV2Sol1.deploy(
      this.savingAccountsV2Sol1.address
    );
  });

  describe("SavingsAccountV2Sol1", () => {
    it("should accept deposits", async () => {
      const deployerBalance = await this.savingAccountsV2Sol1.balanceOf(
        deployer.address
      );
      expect(deployerBalance).to.eq(ethers.utils.parseEther("100"));
      const userBalance = await this.savingAccountsV2Sol1.balanceOf(
        user.address
      );
      expect(userBalance).to.eq(ethers.utils.parseEther("50"));
    });
    it("should accept withdrawals", async () => {
      await this.savingAccountsV2Sol1.withdraw();
      const deployerBalance = await this.savingAccountsV2Sol1.balanceOf(
        deployer.address
      );
      const userBalance = await this.savingAccountsV2Sol1.balanceOf(
        user.address
      );
      expect(deployerBalance).to.eq(0);
      expect(userBalance).to.eq(ethers.utils.parseEther("50"));
    });
    it("InvestorV2Attack", async () => {
      console.log("\n*** Before ***");
      console.log(
        `SavingsAccountV2Sol1's Balance: ${ethers.utils
          .formatEther(
            await ethers.provider.getBalance(this.savingAccountsV2Sol1.address)
          )
          .toString()}`
      );
      console.log(
        `Attacker's Balance: ${ethers.utils
          .formatEther(await ethers.provider.getBalance(attacker.address))
          .toString()}`
      );

      await this.investorV2Sol1.attack({
        value: ethers.utils.parseEther("10"),
      });
      console.log("\n*** After ***");
      console.log(
        `SavingsAccountV2Sol1's Balance: ${ethers.utils
          .formatEther(
            await ethers.provider.getBalance(this.savingAccountsV2Sol1.address)
          )
          .toString()}`
      );
      console.log(
        `Attacker's Balance: ${ethers.utils
          .formatEther(await ethers.provider.getBalance(attacker.address))
          .toString()}`
      );

      expect(
        await ethers.provider.getBalance(this.savingAccountsV2Sol1.address)
      ).to.eq(0);
    });
  });
});
