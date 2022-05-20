import assert from "assert";
import anchor from "@project-serum/anchor";

const main = async () => {
  console.log("Starting tests...");

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.GifPortal;

  const baseAccount = anchor.web3.Keypair.generate();

  const tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    },
    signers: [baseAccount],
  });
  console.log("Your Transaction Signature is: ", tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("GIF count", account.totalGifs.toString());

  await program.rpc.AddGif(
    "https://preview.redd.it/p5el9g06hauy.gif?format=mp4&s=56d2d75d0b61b134720a56a8d41e7e19a0a0ff8b",
    {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    }
  );

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("GIF count", account.totalGifs.toString());
  console.log("GIF List", account.gifList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
