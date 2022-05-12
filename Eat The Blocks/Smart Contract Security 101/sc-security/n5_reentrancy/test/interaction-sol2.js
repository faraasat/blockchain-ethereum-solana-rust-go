const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reentrancy Sol2", () => {
  let deployer, user, attacker;

  beforeEach(async () => {
    [deployer, user, attacker] = await ethers.getSigners();
    const SavingAccountsV2Sol2 = await ethers.getContractFactory(
      "SavingAccountsV2Sol2",
      deployer
    );
    this.savingAccountsV2Sol2 = await SavingAccountsV2Sol2.deploy();

    this.savingAccountsV2Sol2.deposit({
      value: ethers.utils.parseEther("200"),
    });
    this.savingAccountsV2Sol2
      .connect(user)
      .deposit({ value: ethers.utils.parseEther("50") });

    const InvestorV2Sol2 = await ethers.getContractFactory(
      "InvestorV2Sol2",
      attacker
    );
    this.investorV2Sol2 = await InvestorV2Sol2.deploy(
      this.savingAccountsV2Sol2.address
    );
  });

  describe("SavingsAccountV2Sol2", () => {
    it("should accept deposits", async () => {
      const deployerBalance = await this.savingAccountsV2Sol2.balanceOf(
        deployer.address
      );
      expect(deployerBalance).to.eq(ethers.utils.parseEther("200"));
      const userBalance = await this.savingAccountsV2Sol2.balanceOf(
        user.address
      );
      expect(userBalance).to.eq(ethers.utils.parseEther("50"));
    });
    it("should accept withdrawals", async () => {
      await this.savingAccountsV2Sol2.withdraw();
      const deployerBalance = await this.savingAccountsV2Sol2.balanceOf(
        deployer.address
      );
      const userBalance = await this.savingAccountsV2Sol2.balanceOf(
        user.address
      );
      expect(deployerBalance).to.eq(0);
      expect(userBalance).to.eq(ethers.utils.parseEther("50"));
    });
    it("InvestorV2Attack", async () => {
      console.log("\n*** Before ***");
      console.log(
        `SavingsAccountV2Sol2's Balance: ${ethers.utils
          .formatEther(
            await ethers.provider.getBalance(this.savingAccountsV2Sol2.address)
          )
          .toString()}`
      );
      console.log(
        `Attacker's Balance: ${ethers.utils
          .formatEther(await ethers.provider.getBalance(attacker.address))
          .toString()}`
      );

      await this.investorV2Sol2.attack({
        value: ethers.utils.parseEther("20"),
      });
      console.log("\n*** After ***");
      console.log(
        `SavingsAccountV2Sol2's Balance: ${ethers.utils
          .formatEther(
            await ethers.provider.getBalance(this.savingAccountsV2Sol2.address)
          )
          .toString()}`
      );
      console.log(
        `Attacker's Balance: ${ethers.utils
          .formatEther(await ethers.provider.getBalance(attacker.address))
          .toString()}`
      );

      expect(
        await ethers.provider.getBalance(this.savingAccountsV2Sol2.address)
      ).to.eq(0);
    });
  });
});
