require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
// to check transaction on etherscan import it
//  it is 'like' the remix frontend and you can see all implemented functionality
require("@nomiclabs/hardhat-etherscan");
const { API_URL_RINKEBY, PRIVATE_KEY, API_URL_ETHERSCAN } = process.env; 
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.2",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: API_URL_RINKEBY,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: API_URL_ETHERSCAN,
  }
};
