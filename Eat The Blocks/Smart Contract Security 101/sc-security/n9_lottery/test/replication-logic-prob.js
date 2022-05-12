const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Logic Replication", () => {
  let deployer, attacker, user;

  beforeEach(async () => {
    [deployer, attacker, user] = await ethers.getSigners();

    const LotteryProb = await ethers.getContractFactory(
      "LotteryProb",
      deployer
    );
    this.lotteryProb = await LotteryProb.deploy();

    const LotteryAttackerProb = await ethers.getContractFactory(
      "LotteryAttackerProb",
      attacker
    );
    this.lotteryAttackerProb = await LotteryAttackerProb.deploy(
      this.lotteryProb.address
    );
  });

  describe("Lottery", () => {
    describe("Attack", () => {
      it("replicates a random logic within the same block", async () => {
        await this.lotteryAttackerProb.attack({
          value: ethers.utils.parseEther("10"),
        });
        await this.lotteryProb.endLottery();
        await ethers.provider.send("evm_mine");

        console.log(
          "Attacker Number: " +
            (await this.lotteryProb.bets(this.lotteryAttackerProb.address))
        );
        console.log(
          "Winning numner: " + (await this.lotteryProb.winningNumber())
        );
      });
    });
  });
});
