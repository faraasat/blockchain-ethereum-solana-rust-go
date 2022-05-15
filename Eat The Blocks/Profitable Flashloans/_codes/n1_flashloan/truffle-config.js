require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    mainnet: {
      provider: () =>
        new HDWalletProvider(process.env.PRIVATE_KEY, process.env.INFURA_URL),
      network_id: 1,
    },
  },

  compilers: {
    solc: {
      version: "0.8.13",
    },
  },
};
