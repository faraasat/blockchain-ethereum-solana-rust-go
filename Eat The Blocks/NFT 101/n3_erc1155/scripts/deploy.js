const { ethers } = require("hardhat");

const main = async () => {
  const SuperMarioWorldERC1155 = await ethers.getContractFactory(
    "SuperMarioWorldERC1155"
  );
  const superMarioWorldERC1155 = await SuperMarioWorldERC1155.deploy(
    "SuperMarioWorldERC1155",
    "SPRME"
  );
  await superMarioWorldERC1155.deployed();
  console.log(
    "Success! contract was deployed to: ",
    superMarioWorldERC1155.address
  );

  await superMarioWorldERC1155.mint(
    10,
    "https://ipfs.io/ipfs/QmUYMgqe6AQVaw2UjYJ2NdAEdRnSB2k6VdMnHjhQ1swvMG"
  );
  console.log("NFT Successfully Minted");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
