const { ethers } = require("hardhat");

async function main(){
    const [deployer] = await ethers.getSigners();
    const TennisNFT = await ethers.getContractFactory("TennisNFT");
    const tennisNFT = await TennisNFT.deploy();
    console.log("TennisNFT Address is : ", tennisNFT.address);

    const AthleteRegistration = await ethers.getContractFactory("AthleteRegistration");
    const athleteRegistration = await AthleteRegistration.deploy();
    console.log("AthleteRegistration Address is : ", athleteRegistration.address);

    const Club = await ethers.getContractFactory("Club");
    const club = await AthleteRegistration.deploy();
    console.log("AthleteRegistration Address is : ", club.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })