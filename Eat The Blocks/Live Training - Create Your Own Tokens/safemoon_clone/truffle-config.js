const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const secret = fs.readFileSync(".secret").toString().trim();
const mnemonic = secret.split(",")[0];

module.exports = {
  networks: {
    bsc: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    bscTestnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://data-seed-prebsc-1-s1.binance.org:8545`
        ),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 2000,
      skipDryRun: true,
    },
  },

  compilers: {
    solc: {
      version: "0.8.13",
    },
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    bscscan: secret.split(",")[1],
  },
};
