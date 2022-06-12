//Let's add logic to our mint.js in order to mint NFTs
//Input the "Application ID" for your server instance from Moralis Admin Dashboard
//Input the "Server UrL" for your server instance from Moralis Admin Dashboard

Moralis.start({ serverUrl: "https://5uzummvznv3l.usemoralis.com:2053/server", appId: "GdzQbVwzF0yXbTmsmMRdhgP2oza5ZSJpmyMyoSP1" });

//Copying our deployed smart contract address here so that we can use it anywhere
const CONTRACT_ADDRESS = "0xE4dD36ba0876aa00E8DeaADabBB0d3aA071B18Db";

//Define an empty object in order to be able to use the web3 library of Moralis later in our code
let web3;

//Checking whether the user has logged in already
async function login() {
    try {
        //Let's fetch the current user first; in order to check whether the user is logged in or not
        currentUser = Moralis.User.current();
      
        if(!currentUser){
            //If the user hasn't logged in, we are redirecting the user back to the index page
            //In the Index page, we have the login button, from where the user can login and come here again
            window.location.pathname="/index.html";
        }

        //
        web3 = await Moralis.enableWeb3();
        let accounts = await web3.eth.getAccounts();
        

        //Let's get the nftId first. We can pre-populate that
        //This URLSearchParams will give us the full string of request URL - "https://blablah.com/?nftId=" along with the query string
        const urlParams = new URLSearchParams(window.location.search);
        //From that, we are extracting the nftId
        const nftId = urlParams.get("nftId");
        //Set the "Token ID" of the Minting Form to automatically store the value of the tokenID that was passed in the URL
        document.getElementById("token_id_input").value = nftId;
        //address[0] is the current signed-in Metamask user's address
        document.getElementById("address_input").value = accounts[0];


    } catch (error) {
        console.log(error);
    }
}

//
async function mint(){
    //We are parsing the tokenId to an integer because our smart contract expects it to be an integer and not the text
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let amount = parseInt(document.getElementById("amount_input").value);
    let address = document.getElementById("address_input").value;
    //Get your account address from Metamask
    const accounts = await web3.eth.getAccounts();

    //Now, we need to do the actual call to the smart contract. We will need Web3 library for this purpose
    //Moralis has the web3 library built-in
    //First, define the contract
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS); //Copy-paste the contract ABI
    //The value of CONTRACT_ABI is stored in a separate file called abi.js
    //Now that we have the contract object defined, we can make the MINT call
    //This mint() function accepts some parameters which can be referred in our smart contract/ERC 1155 contract
    //After minting, we are directly sending to our(contract owner) address. value=0 because we are not sending any Ethers to this account, only the NFT
    contract.methods.mint(address, tokenId, amount).send({from: accounts[0], value: 0})
    .on("receipt", function(receipt){
        //Writing the function that will run when this minting is complete
        //the "on" will listen for specific events. "on" will run when we get the "receipt" back, which means that the transaction has been added to the blockchain
        alert("Mint done");
        //We have minted the NFT to our own address
    });
}

//Add an on-click event to the button
document.getElementbyId("submit_mint").onclick = mint;

//Call the login function
login();


  
