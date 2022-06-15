require("@nomiclabs/hardhat-waffle");

const loadJsonFile = require('load-json-file');
const keys = loadJsonFile.sync("./keys.json");

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
  defaultNetwork: "hardhat",
  paths: {
    artifacts: './frontend/src/artifacts',
  },
  networks: {
    rinkeby: {
      url: keys.networks.rinkeby.url,
      accounts: [keys.networks.rinkeby.key]
    }
  },
  solidity: "0.8.4",
  etherscan: {
    apiKey: keys.networks.rinkeby.etherscan_api
  }
};
