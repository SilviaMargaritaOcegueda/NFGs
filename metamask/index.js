const {ethers} = require("ethers");

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await ethereum.request({ method: "eth_requestAccounts"});
    }
} 

async function execute() {
    // address
    // contract ABI (blueprint to interact with a contract)
    // function
    // node connection  <-- metamask
}

module.exports = {
    connect,
    execute,
}