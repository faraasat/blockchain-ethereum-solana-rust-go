import { useEffect, useState } from "react";
import styled from "styled-components";
import { NFTCard } from "./components/NFTCard";
import { NFTModal } from "./components/NFTModal";
import { ethers } from "ethers";
import { connect } from "./helpers";
const axios = require("axios");

function App() {
  let initialNfts = [
    {
      name: "Mario",
      symbol: "SMWC",
      copies: 10,
      image:
        "https://www.pexels.com/photo/358238/download/?search_query=scenery&tracking_id=kccev0knm8e",
    },
    {
      name: "Luigi",
      symbol: "SMWC",
      copies: 10,
      image:
        "https://www.pexels.com/photo/358238/download/?search_query=scenery&tracking_id=kccev0knm8e",
    },
    {
      name: "Yoshi",
      symbol: "SMWC",
      copies: 10,
      image:
        "https://www.pexels.com/photo/358238/download/?search_query=scenery&tracking_id=kccev0knm8e",
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [selectedNft, setSelectedNft] = useState();
  const [nfts, setNfts] = useState(initialNfts);

  useEffect(() => {
    (async () => {
      const address = await connect();
      if (address) {
        console.log(address)
        getNfts(address);
      }
    })();
  }, []);

  function toggleModal(i) {
    if (i >= 0) {
      setSelectedNft(nfts[i]);
    }
    setShowModal(!showModal);
  }

  const getMetadataFromIpfs = async (tokenURI) => {
    let metadata = await axios.get(tokenURI);
    return metadata.data;
  };

  const getNfts = async (address) => {
    const rpc =
      "https://rpc-mumbai.maticvigil.com/v1/7b0068775a3a87a0305d7e3fa6df79a28eba1a5c";
    const ethersProvider = new ethers.providers.JsonRpcProvider(rpc);

    let abi = [
      "function symbol() public view returns(string memory)",
      "function tokenCount() public view returns(uint256)",
      "function uri(uint256 _tokenId) public view returns(string memory)",
      "function balanceOfBatch(address[] accounts, uint256[] ids) public view returns(uint256[])",
    ];

    let nftCollection = new ethers.Contract(
      "0xf848FD74ECfC58Fdf8AeA799a4DC87458e39dfB8",
      abi,
      ethersProvider
    );

    let numberOfNfts = (await nftCollection.tokenCount()).toNumber();
    let collectionSymbol = await nftCollection.symbol();

    let accounts = Array(numberOfNfts).fill(address);
    let ids = Array.from({ length: numberOfNfts }, (_, i) => i + 1);
    let copies = await nftCollection.balanceOfBatch(accounts, ids);

    let tempArray = [];
    let baseUrl = "";

    for (let i = 1; i <= numberOfNfts; i++) {
      if (Number(i) === 1) {
        let tokenUri = await nftCollection.uri(i);
        baseUrl = tokenUri.replace(/\d+.json/, "");
        let metadata = await getMetadataFromIpfs(tokenUri);
        metadata.symbol = collectionSymbol;
        metadata.copies = copies[i - 1];
        tempArray.push(metadata);
      } else {
        let metadata = await getMetadataFromIpfs(baseUrl + `${i}.json`);
        metadata.symbol = collectionSymbol;
        metadata.copies = copies[i - 1];
        tempArray.push(metadata);
      }
    }

    setNfts(tempArray);
  };

  return (
    <div>
      <Container>
        <Title>Super Mario World Collection</Title>
        <Subtitle>The Rarest and Best of Super Mario World</Subtitle>
        <Grid>
          {nfts.map((nft, i) => (
            <NFTCard nft={nft} key={i} toggleModal={() => toggleModal(i)} />
          ))}
        </Grid>
      </Container>
      {showModal && (
        <NFTModal nft={selectedNft} toggleModal={() => toggleModal()} />
      )}
    </div>
  );
}

const Title = styled.h1`
  margin: 0;
  text-align: center;
`;

const Subtitle = styled.h4`
  color: gray;
  margin-top: 0;
  text-align: center;
`;

const Container = styled.div`
  width: 70%;
  max-width: 1200px;
  margin: auto;
  margin-top: 100px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
`;

export default App;
