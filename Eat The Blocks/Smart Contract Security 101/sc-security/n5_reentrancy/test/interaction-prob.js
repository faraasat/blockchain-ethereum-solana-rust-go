const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reentrancy Problem", () => {
  let deployer, user, attacker;

  beforeEach(async () => {
    [deployer, user, attacker] = await ethers.getSigners();
    const SavingAccountsV2Prob = await ethers.getContractFactory(
      "SavingAccountsV2Prob",
      deployer
    );
    this.savingAccountsV2Prob = await SavingAccountsV2Prob.deploy();

    this.savingAccountsV2Prob.deposit({
      value: ethers.utils.parseEther("100"),
    });
    this.savingAccountsV2Prob
      .connect(user)
      .deposit({ value: ethers.utils.parseEther("50") });

    const InvestorV2Prob = await ethers.getContractFactory(
      "InvestorV2Prob",
      attacker
    );
    this.investorV2Prob = await InvestorV2Prob.deploy(
      this.savingAccountsV2Prob.address
    );
  });

  describe("SavingsAccountV2Prob", () => {
    it("should accept deposits", async () => {
      const deployerBalance = await this.savingAccountsV2Prob.balanceOf(
        deployer.address
      );
      expect(deployerBalance).to.eq(ethers.utils.parseEther("100"));
      const userBalance = await this.savingAccountsV2Prob.balanceOf(
        user.address
      );
      expect(userBalance).to.eq(ethers.utils.parseEther("50"));
    });
    it("should accept withdrawals", async () => {
      await this.savingAccountsV2Prob.withdraw();
      const deployerBalance = await this.savingAccountsV2Prob.balanceOf(
        deployer.address
      );
      const userBalance = await this.savingAccountsV2Prob.balanceOf(
        user.address
      );
      expect(deployerBalance).to.eq(0);
      expect(userBalance).to.eq(ethers.utils.parseEther("50"));
    });
    it("InvestorV2Attack", async () => {
      console.log("\n*** Before ***");
      console.log(
        `SavingsAccountV2Prob's Balance: ${ethers.utils
          .formatEther(
            await ethers.provider.getBalance(this.savingAccountsV2Prob.address)
          )
          .toString()}`
      );
      console.log(
        `Attacker's Balance: ${ethers.utils
          .formatEther(await ethers.provider.getBalance(attacker.address))
          .toString()}`
      );

      await this.investorV2Prob.attack({
        value: ethers.utils.parseEther("10"),
      });
      console.log("\n*** After ***");
      console.log(
        `SavingsAccountV2Prob's Balance: ${ethers.utils
          .formatEther(
            await ethers.provider.getBalance(this.savingAccountsV2Prob.address)
          )
          .toString()}`
      );
      console.log(
        `Attacker's Balance: ${ethers.utils
          .formatEther(await ethers.provider.getBalance(attacker.address))
          .toString()}`
      );

      expect(
        await ethers.provider.getBalance(this.savingAccountsV2Prob.address)
      ).to.eq(0);
    });
  });
});
