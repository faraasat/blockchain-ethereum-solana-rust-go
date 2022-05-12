const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Replay Attack", () => {
  let deployer, adminOne, adminTwo, user, attacker;

  beforeEach(async () => {
    [deployer, adminOne, adminTwo, user, attacker] = await ethers.getSigners();

    const MultiSigWalletProb = await ethers.getContractFactory(
      "MultiSigWalletProb",
      deployer
    );
    this.mutliSigWalletProb = await MultiSigWalletProb.deploy([
      adminOne.address,
      adminTwo.address,
    ]);

    await adminOne.sendTransaction({
      to: this.mutliSigWalletProb.address,
      value: ethers.utils.parseEther("10"),
    });
  });

  describe("MultiSigWallet", () => {
    it("should allow transfer funds after receiving both signatures", async () => {
      const before = await ethers.provider.getBalance(user.address);
      const amount = ethers.utils.parseEther("1");

      // message Encoding
      const message = ethers.utils.solidityPack(
        ["address", "uint256"],
        [user.address, amount]
      );
      const messageBuffer = ethers.utils.concat([message]);

      // Sign Message
      let adminOneSig = await adminOne.signMessage(messageBuffer);
      let adminTwoSig = await adminTwo.signMessage(messageBuffer);

      // Expanded form
      let adminOneSplitSig = ethers.utils.splitSignature(adminOneSig);
      let adminTwoSplitSig = ethers.utils.splitSignature(adminTwoSig);

      await this.mutliSigWalletProb.transfer(user.address, amount, [
        adminOneSplitSig,
        adminTwoSplitSig,
      ]);

      const after = await ethers.provider.getBalance(user.address);

      expect(after).to.eq(before.add(ethers.utils.parseEther("1")));
    });
    it("should revert if other than the admins sign the tx", async () => {
      const amount = ethers.utils.parseEther("1");

      // message Encoding
      const message = ethers.utils.solidityPack(
        ["address", "uint256"],
        [user.address, amount]
      );
      const messageBuffer = ethers.utils.concat([message]);

      // Sign Message
      let adminOneSig = await attacker.signMessage(messageBuffer);
      let adminTwoSig = await adminTwo.signMessage(messageBuffer);

      // Expanded form
      let adminOneSplitSig = ethers.utils.splitSignature(adminOneSig);
      let adminTwoSplitSig = ethers.utils.splitSignature(adminTwoSig);

      await expect(
        this.mutliSigWalletProb.transfer(user.address, amount, [
          adminOneSplitSig,
          adminTwoSplitSig,
        ])
      ).to.be.revertedWith("Access Restricted");
    });
    it("Replay Attack", async () => {
      const before = await ethers.provider.getBalance(user.address);
      const amount = ethers.utils.parseEther("1");

      // message Encoding
      const message = ethers.utils.solidityPack(
        ["address", "uint256"],
        [user.address, amount]
      );
      const messageBuffer = ethers.utils.concat([message]);

      // Sign Message
      let adminOneSig = await adminOne.signMessage(messageBuffer);
      let adminTwoSig = await adminTwo.signMessage(messageBuffer);

      // Expanded form
      let adminOneSplitSig = ethers.utils.splitSignature(adminOneSig);
      let adminTwoSplitSig = ethers.utils.splitSignature(adminTwoSig);

      await this.mutliSigWalletProb.transfer(user.address, amount, [
        adminOneSplitSig,
        adminTwoSplitSig,
      ]);
      // Using same signature to send a fake transaction result in gaing one more ether
      await this.mutliSigWalletProb.transfer(user.address, amount, [
        adminOneSplitSig,
        adminTwoSplitSig,
      ]);

      const after = await ethers.provider.getBalance(user.address);

      expect(after).to.eq(before.add(ethers.utils.parseEther("2")));
    });
  });
});
