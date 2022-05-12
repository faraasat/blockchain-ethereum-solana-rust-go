const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Proxy", () => {
  let deployer, user;

  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners();

    const LogicV1Prob = await ethers.getContractFactory(
      "LogicV1Prob",
      deployer
    );
    this.logicV1Prob = await LogicV1Prob.deploy();

    const ProxyProb = await ethers.getContractFactory("ProxyProb", deployer);
    this.proxyProb = await ProxyProb.deploy(this.logicV1Prob.address);

    const LogicV2Prob = await ethers.getContractFactory(
      "LogicV2Prob",
      deployer
    );
    this.logicV2Prob = await LogicV2Prob.deploy();

    this.proxyPattern = await ethers.getContractAt(
      "LogicV1Prob",
      this.proxyProb.address
    );

    this.proxyPattern2 = await ethers.getContractAt(
      "LogicV2Prob",
      this.proxyProb.address
    );
  });

  describe("Proxy", () => {
    it("should return the address of logic V1 when calling logicContract()", async () => {
      expect(await this.proxyProb.logicContract()).to.eq(
        this.logicV1Prob.address
      );
    });
    it("should revert if anyone other than the owner tries to upgrade", async () => {
      await expect(
        this.proxyProb.connect(user).upgrade(this.logicV2Prob.address)
      ).to.be.revertedWith("Access Restricted");
    });
    it("should allow the owner to update the Logic Contract", async () => {
      await this.proxyProb.upgrade(this.logicV2Prob.address);
      expect(await this.proxyProb.logicContract()).to.eq(
        this.logicV2Prob.address
      );
    });
    it("Calling increaseX of LogicV1 should add 1 to x Proxy's state", async () => {
      await this.proxyPattern.connect(user).increaseX();
      expect(await this.proxyProb.x()).to.eq(1);
      expect(await this.logicV1Prob.x()).to.eq(0);
    });
    it("Calling increaseX of LogicV2 should add 2 to x Proxy's state", async () => {
      await this.proxyProb.upgrade(this.logicV2Prob.address);
      await this.proxyPattern2.increaseX();
      expect(await this.proxyProb.x()).to.eq(2);
      expect(await this.logicV2Prob.x()).to.eq(0);
    });
    it("Should set y", async () => {
      await this.proxyProb.upgrade(this.logicV2Prob.address);
      await this.proxyPattern2.setY(5);

      // happend due to sorage collision
      expect(await this.proxyProb.owner()).to.eq(
        "0x0000000000000000000000000000000000000005"
      );
    });
  });
});
