require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      blockGasLimit: 2000000,
    },
  },
  solidity: "0.8.4",
  gasReporter: {
    enabled: true,
    currency: "USD",
  },
  mocha: {
    timeout: 200000000,
  },
};
