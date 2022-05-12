const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DoS", () => {
  let deployer, attacker, user;

  beforeEach(async () => {
    [deployer, attacker, user] = await ethers.getSigners();

    const AuctionProb = await ethers.getContractFactory(
      "AuctionProb",
      deployer
    );
    this.auctionProb = await AuctionProb.deploy();

    this.auctionProb.bid({ value: 100 });
  });

  describe("AuctionProb", () => {
    describe("If bid is lower than highestBid", () => {
      it("should NOT accept bids lower than current", async () => {
        await expect(
          this.auctionProb.connect(user).bid({ value: 50 })
        ).to.be.revertedWith("Bid not high enough");
      });
    });
    describe("If bid is higher than highestBid", () => {
      it("should accept it and update highestBid", async () => {
        await this.auctionProb.connect(user).bid({ value: 150 });
        expect(await this.auctionProb.highestBid()).to.eq(150);
      });
      it("should make msg.sender currentLeader", async () => {
        await this.auctionProb.connect(user).bid({ value: 150 });
        expect(await this.auctionProb.currentLeader()).to.eq(user.address);
      });
      it("should add previous leader and highestBid to refunds", async () => {
        await this.auctionProb.connect(user).bid({ value: 150 });
        [addr, amount] = await this.auctionProb.refunds(0);
        expect(addr).to.eq(deployer.address);
        expect(amount).to.eq(100);
      });
    });
    describe("When calling refundAll()", () => {
      it("should refund the bidders that didn't win", async () => {
        await this.auctionProb.connect(user).bid({ value: 150 });
        await this.auctionProb.bid({ value: 200 });

        const userBalanceBefore = await ethers.provider.getBalance(
          user.address
        );
        await this.auctionProb.refundAll();
        const userBalanceAfter = await ethers.provider.getBalance(user.address);
        expect(userBalanceAfter).to.eq(userBalanceBefore.add(150));
      });
      it("Should revert if the amount of computation hits the block gas limit", async () => {
        for (let i = 0; i < 1500; i++) {
          await this.auctionProb.connect(attacker).bid({ value: 150 + i });
        }
        await this.auctionProb.refundAll();
      });
    });
  });
});
