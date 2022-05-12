const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Replay Attack", () => {
  let deployer, adminOne, adminTwo, user, attacker;

  beforeEach(async () => {
    [deployer, adminOne, adminTwo, user, attacker] = await ethers.getSigners();

    const MultiSigWalletSol = await ethers.getContractFactory(
      "MultiSigWalletSol",
      deployer
    );
    this.mutliSigWalletSol = await MultiSigWalletSol.deploy([
      adminOne.address,
      adminTwo.address,
    ]);

    await adminOne.sendTransaction({
      to: this.mutliSigWalletSol.address,
      value: ethers.utils.parseEther("10"),
    });
  });

  describe("MultiSigWallet", () => {
    it("should allow transfer funds after receiving both signatures", async () => {
      const before = await ethers.provider.getBalance(user.address);
      const amount = ethers.utils.parseEther("1");
      const nonce = 1;

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

      await this.mutliSigWalletSol.transfer(
        user.address,
        amount,
        [adminOneSplitSig, adminTwoSplitSig],
        nonce
      );

      const after = await ethers.provider.getBalance(user.address);

      expect(after).to.eq(before.add(ethers.utils.parseEther("1")));
    });
    it("should revert if other than the admins sign the tx", async () => {
      const amount = ethers.utils.parseEther("1");
      const nonce = 1;

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
        this.mutliSigWalletSol.transfer(
          user.address,
          amount,
          [adminOneSplitSig, adminTwoSplitSig],
          nonce
        )
      ).to.be.revertedWith("Access Restricted");
    });
    it("Replay Attack", async () => {
      const amount = ethers.utils.parseEther("1");
      const nonce = 1;

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

      await this.mutliSigWalletSol.transfer(
        user.address,
        amount,
        [adminOneSplitSig, adminTwoSplitSig],
        nonce
      );
      await expect(
        this.mutliSigWalletSol.transfer(
          user.address,
          amount,
          [adminOneSplitSig, adminTwoSplitSig],
          nonce
        )
      ).to.be.revertedWith("Signature expired");
    });
  });
});
