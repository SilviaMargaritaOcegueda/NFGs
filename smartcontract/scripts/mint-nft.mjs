// address received after command npx hardhat run scripts/deploy-contract.mjs --network rinkeby
// url received after command node scripts/store-asset.mjs
import dotenv from 'dotenv'
dotenv.config()
const META_DATA_URL = process.env.META_DATA_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

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