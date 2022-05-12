const { ethers } = require("hardhat");

const main = async () => {
  const SuperMarioWorldOZ = await ethers.getContractFactory(
    "SuperMarioWorldOZ"
  );
  const superMarioWorldOZ = await SuperMarioWorldOZ.deploy(
    "SuperMarioWorldOZ",
    "SPRMO"
  );
  await superMarioWorldOZ.deployed();
  console.log("Success! contract was deployed to: ", superMarioWorldOZ.address);

  await superMarioWorldOZ.mint(
    "https://ipfs.io/ipfs/QmYoVjXNGbAVHKucFJ3xw8MMxWqFXHtyWPLzf4EB8aLW4f"
  );
  console.log("NFT Successfully Minted");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
