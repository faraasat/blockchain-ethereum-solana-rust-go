import { useEffect, useState } from "react";

import "./App.css";

import { setProofApi, use } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-web3";
const { POSClient } = require("@maticnetwork/maticjs").default;
const HDWalletProvider = require("@truffle/hdwallet-provider");

function App() {
  const rootTokenAddress = "0x655F2166b0709cd575202630952D71E2bB0d61Af";
  const childTokenAddress = "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1";
  const parentProvider =
    "https://goerli.infura.io/v3/a9684e7d2ecb474d9cb45f1de0fd9d86";
  const childProvider = "https://matic-mumbai.chainstacklabs.com";
  const [account, setAccount] = useState("");
  const [burnTxhash, setBurnTxhash] = useState("");

  const getPOSClient = async (network = "testnet", version = "mumbai") => {
    const posClient = new POSClient();

    return await posClient.init({
      network,
      version,
      parent: {
        provider: new HDWalletProvider(
          "3e196d65a9f1e1ea57801e9b60deba9fce75b2320453edd774e024eced799240",
          window.ethereum
        ),
        defaultConfig: { from: childProvider },
      },
      child: {
        provider: new HDWalletProvider(
          "3e196d65a9f1e1ea57801e9b60deba9fce75b2320453edd774e024eced799240",
          parentProvider
        ),
        defaultConfig: { from: window.ethereum },
      },
    });
  };

  useEffect(() => {
    use(Web3ClientPlugin);
    setProofApi("https://apis.matic.network/");
    const init = async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    };
    if (window.ethereum) init();
    else console.log("No Ethereum Provider");
  }, []);

  const handleApprove = async () => {
    try {
      const client = await getPOSClient();
      const erc20RootToken = client.erc20(rootTokenAddress, true);
      const approveResult = await erc20RootToken.approve(
        "1000000000000000000",
        { from: account }
      );
      const txHash = await approveResult.getTransactionHash();
      const txReceipt = await approveResult.getReceipt();
      console.log(txHash);
      console.log(txReceipt);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeposit = async () => {
    try {
      const client = await getPOSClient();
      const erc20RootToken = client.erc20(rootTokenAddress, true);
      const approveResult = await erc20RootToken.deposit(
        "1000000000000000000",
        account,
        { from: account }
      );
      const txHash = await approveResult.getTransactionHash();
      const txReceipt = await approveResult.getReceipt();
      console.log(txHash);
      console.log(txReceipt);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBurn = async () => {
    try {
      const client = await getPOSClient();
      const erc20Token = client.erc20(childTokenAddress, false);
      const approveResult = await erc20Token.withdrawStart(
        "500000000000000000",
        { from: account }
      );
      const txHash = await approveResult.getTransactionHash();
      const txReceipt = await approveResult.getReceipt();
      setBurnTxhash(txHash);
      console.log(txHash);
      console.log(txReceipt);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExit = async () => {
    try {
      const client = await getPOSClient();
      const erc20Token = client.erc20(rootTokenAddress, true);
      const approveResult = await erc20Token.withdrawExitFaster(burnTxhash, {
        from: account,
      });
      const txHash = await approveResult.getTransactionHash();
      const txReceipt = await approveResult.getReceipt();
      console.log(txHash);
      console.log(txReceipt);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Polygon Matic Bridge Function</h1>
      <div className="cards">
        <div className="card">
          <h2>ETH {">"} Matic</h2>
          <div>
            <button onClick={() => handleApprove()}>Approve</button>
            <button onClick={() => handleDeposit()}>Deposit</button>
          </div>
        </div>
        <div className="card">
          <h2>Matic {">"} ETH</h2>
          <div>
            <button onClick={() => handleBurn()}>Burn</button>
            <button onClick={() => handleExit()}>Exit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
