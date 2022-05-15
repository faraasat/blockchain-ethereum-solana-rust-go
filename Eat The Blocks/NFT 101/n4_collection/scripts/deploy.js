const { ethers } = require("hardhat");

const main = async () => {
  const SuperMarioWorldCollection = await ethers.getContractFactory(
    "SuperMarioWorldCollection"
  );
  const superMarioWorldCollection = await SuperMarioWorldCollection.deploy(
    "SuperMarioWorldCollection",
    "SPRMC",
    "https://ipfs.io/ipfs/Qmb6tWBDLd9j2oSnvSNhE314WFL7SRpQNtfwjFWsStXp5A/"
  );
  await superMarioWorldCollection.deployed();
  console.log(
    "Success! contract was deployed to: ",
    superMarioWorldCollection.address
  );

  await superMarioWorldCollection.mint(10); // 1 Mario
  await superMarioWorldCollection.mint(10); // 2 Luigi
  await superMarioWorldCollection.mint(10);
  await superMarioWorldCollection.mint(10);
  await superMarioWorldCollection.mint(1); // 5 Mario Gold (rare)
  await superMarioWorldCollection.mint(1); // 6 Luigi Gold (rare)
  await superMarioWorldCollection.mint(1);
  await superMarioWorldCollection.mint(1);

  console.log("NFT Successfully Minted");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
