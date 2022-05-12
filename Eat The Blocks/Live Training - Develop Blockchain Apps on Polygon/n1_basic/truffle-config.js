const fs = require("fs");

const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = fs.readFileSync(".secret").toString().trim();

console.log(mnemonic);

module.exports = {
  networks: {
    matic: {
      provider: () =>
        // new HDWalletProvider(mnemonic, "https://rpc-mumbai.maticvigil.com"),
        new HDWalletProvider(
          mnemonic,
          "https://matic-mumbai.chainstacklabs.com"
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 20000,
      skipDryRun: true,
    },
  },

  mocha: {},

  compilers: {
    solc: {
      version: "0.8.13",
    },
  },
};
