const { ethers } = require("hardhat");

async function main(){
    const [deployer] = await ethers.getSigners();
    const TennisNFT = await ethers.getContractFactory("TennisNFT");
    const tennisNFT = await TennisNFT.deploy();
    console.log("TennisNFT Address is : ", tennisNFT.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })