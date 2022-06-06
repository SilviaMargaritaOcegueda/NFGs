// address received after command npx hardhat run scripts/deploy-contract.mjs --network rinkeby
const CONTRACT_ADDRESS = "0x2cCeE076E3e52e13519d4478CA7EC8988817c5ed"
// url received after command node scripts/store-asset.mjs
const META_DATA_URL = "ipfs://bafyreifsig5a4ujmfeyjfidtnwvjeeukvnwvvefiumvcx2kv2l4cnaxztu/metadata.json"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });