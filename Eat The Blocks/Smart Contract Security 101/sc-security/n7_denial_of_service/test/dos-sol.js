const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DoS", () => {
  let deployer, attacker, user;

  beforeEach(async () => {
    [deployer, attacker, user] = await ethers.getSigners();

    const AuctionSol = await ethers.getContractFactory("AuctionSol", deployer);
    this.auctionSol = await AuctionSol.deploy();

    this.auctionSol.bid({ value: 100 });
  });

  describe("AuctionSol", () => {
    describe("Pull Over Push Solution", () => {
      it("A user should be able to be refunded for the small number of bids", async () => {
        await this.auctionSol
          .connect(user)
          .bid({ value: ethers.utils.parseEther("1") });
        await this.auctionSol
          .connect(user)
          .bid({ value: ethers.utils.parseEther("2") });
        const userBalanceBefore = await ethers.provider.getBalance(
          user.address
        );
        await this.auctionSol.connect(user).withdrawRefund();
        const userBalanceAfter = await ethers.provider.getBalance(user.address);
        expect(userBalanceAfter).to.be.gt(userBalanceBefore);
      });
      it("A user should be able to be refunded for the very large number of bids", async () => {
        for (let i = 0; i < 1500; i++) {
          await this.auctionSol
            .connect(user)
            .bid({ value: ethers.utils.parseEther("0.0001") + i });
        }
        const userBalanceBefore = await ethers.provider.getBalance(
          user.address
        );
        await this.auctionSol.connect(user).withdrawRefund();
        const userBalanceAfter = await ethers.provider.getBalance(user.address);
        expect(userBalanceAfter).to.be.gt(userBalanceBefore);
      });
    });
  });
});
