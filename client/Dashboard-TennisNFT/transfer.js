//Let's add logic to our mint.js in order to mint NFTs
//Input the "Application ID" for your server instance from Moralis Admin Dashboard
//Input the "Server UrL" for your server instance from Moralis Admin Dashboard

Moralis.start({ serverUrl: "https://5uzummvznv3l.usemoralis.com:2053/server", appId: "GdzQbVwzF0yXbTmsmMRdhgP2oza5ZSJpmyMyoSP1" });

//Copying our deployed smart contract address here so that we can use it anywhere
const CONTRACT_ADDRESS = "0xE4dD36ba0876aa00E8DeaADabBB0d3aA071B18Db";


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

                

        //Let's get the nftId first. We can pre-populate that
        //This URLSearchParams will give us the full string of request URL - "https://blablah.com/?nftId=" along with the query string
        const urlParams = new URLSearchParams(window.location.search);
        //From that, we are extracting the nftId
        const nftId = urlParams.get("nftId");
        //Set the "Token ID" of the Minting Form to automatically store the value of the tokenID that was passed in the URL
        document.getElementById("token_id_input").value = nftId;
        
        


    } catch (error) {
        console.log(error);
    }
}

//
async function transfer(){
    //We are parsing the tokenId to an integer because our smart contract expects it to be an integer and not the text
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let amount = parseInt(document.getElementById("amount_input").value);
    let address = document.getElementById("address_input").value;
    
    //Go to Moralis Docs -> Transfer Assets -> Transfer NFTs -> Transferring ERC1155 Tokens (Semi-Fungible)
    // sending "amount" tokens with token id = "tokenId" to "address"
    const options = {
        type: "erc1155",
        receiver: address,
        contractAddress: CONTRACT_ADDRESS,
        tokenId: tokenId,
        amount: amount,
    };
    let transaction = await Moralis.transfer(options);
    console.log(transaction);


}

//Add an on-click event to the button
document.getElementbyId("submit_transfer").onclick = transfer;

//Call the login function
login();


  
