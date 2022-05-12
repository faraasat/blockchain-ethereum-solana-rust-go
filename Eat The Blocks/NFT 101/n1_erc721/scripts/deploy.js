const { ethers } = require("hardhat");

const main = async () => {
  const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorld");
  const superMarioWorld = await SuperMarioWorld.deploy(
    "SuperMarioWorld",
    "SPRM"
  );
  await superMarioWorld.deployed();
  console.log("Success! contract was deployed to: ", superMarioWorld.address);

  await superMarioWorld.mint(
    "https://ipfs.io/ipfs/Qmch3m7DEFYRaZiFG6gc8qgkBMS3nrTvM5h5v9xZK6rGEz"
  );
  console.log("NFT Successfully Minted");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
