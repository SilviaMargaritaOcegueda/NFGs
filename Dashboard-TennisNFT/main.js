//Initiate Moralis and get our credentials from Moralis Admin Dashboard
//Input the "Application ID" for your server instance from Moralis Admin Dashboard
//Input the "Server UrL" for your server instance from Moralis Admin Dashboard

Moralis.start({ serverUrl: "https://5uzummvznv3l.usemoralis.com:2053/server", appId: "GdzQbVwzF0yXbTmsmMRdhgP2oza5ZSJpmyMyoSP1" });

//Copying our deployed smart contract address here so that we can use it anywhere
const CONTRACT_ADDRESS = "0xE4dD36ba0876aa00E8DeaADabBB0d3aA071B18Db";
let currentUser;

//Fetching the NFT Metadata
//Fetch the tokenID from the "Token URI" - Fetch the "image URL" from the JSON file
function fetchNFTMetadata(NFTs){

    //Let's do an array of promises
    //Create an empty array
    let promises = [];
    for(let i = 0; i < NFTs.length; i++){
        let nft = NFTs[i];
         //Creating our NFT ID
         //This 'id' is used within the 'options' variable while making the API endpoint connection
        let id = nft.token_id;
        //Make a call and fetch the actual metadata
        //We have hosted the metadata on Moralis but we can't fetch it directly due to course rules
        //We need to create a cloud function in Moralis which would fetch us the metadata from the backend
        //Call "Moralis Cloud Function" which would internally call "Static JSON File"
        //Let's first create the Moralis Cloud Function - 
        //Go to Moralis Admin Dashboard -> Choose your server instance -> ... -> Cloud Functions and then write the code for getNFT() function
        //To call this cloud function from our application, refer the Moralis Docs -> Cloud Code -> Cloud Functions -> Calling Via REST API
        //CLOUD FUNCTION URL - "SERVER_URL/functions/function_name?_ApplicationId=your_MoralisAppId&nftId="
        //Now, we can't return everything here because this will run inside every for..loop
        //Instead, we are collecting it into a single promise, when that promise is resolved, we can return an array of those results
        promises.push(fetch("https://5uzummvznv3l.usemoralis.com:2053/server/functions/getNFT?_ApplicationId=GdzQbVwzF0yXbTmsmMRdhgP2oza5ZSJpmyMyoSP1&nftId=" + id)
        
            .then(res => res.json())
            //Console log the result
            //It will return an actual object with a result property that then has a string
            //We want to parse this string to JSON
            .then(res => JSON.parse(res.result)) //Returns the metadata of each NFT in JSON representation
            //Take this result and put it back in NFT object so that we can use it later on, while calling this fetchNFTMedata() function within the login() function - to pass parameters
            .then(res => {nft.metadata = res})
            //We are making use of the getTokenIdOwners API end point to retrieve the list of owners for each NFT
            .then(res => {
                //We are making the API call here
                const options = {
                    address: CONTRACT_ADDRESS,
                    token_id: id,
                    chain: "rinkeby",
                  };
                  return Moralis.Web3API.token.getTokenIdOwners(options);
                  
            })
            //We are not actually interested in getting the promise
            //We are only interested in getting the NFTs
            .then( res => {
                nft.owners = [];
                //Loop through the result that we have got and add them to the NFT
                //We are looping through all NFTs, getting each NFT's owner address, pushing it to the owners array
                //So we are getting an array of addresses (the owner list) for each NFT
                res.result.forEach(element => {
                    //Push this into the owners array
                    nft.owners.push(element.owner_of);
                    
                });
                return nft;
            }))
            //This will give us an array of owners
            //This can just display the individual owners for each NFT
            //However, we want to aggregate this in a nice way into that actual NFT object which we can then use to render
            //We are going to get the owner info into the NFT object so that we can display the owner info in our cards.
        }
    //End of for..loop
    
    //This waits for all of the promises in the array to complete and then it sends back all of its results
    return Promise.all(promises);
    
    //Another method to fetch metadata without using cloud functions
    //let metadata = JSON.parse(NFTs.result[0].metadata);
   
    
}

//Creating another function to handle with NFTWithMetadata - render all the NFTs
function renderInventory(NFTs, ownerData){

    //Parent element of index.html row section to place these cards
    const parent = document.getElementById("app");

    //We are creating a for loop here to loop through every NFT
    //We are going to make the display look like cards - similar to an NFT marketplace
    for (let i = 0; i < NFTs.length; i++) {
        const nft = NFTs[i];
        //Create cards
        //Copy the bootstrap template for Cards
        let htmlString = `
        <div class = "card">
            <img class = "card-img-top" src = "${nft.metadata.image}" alt = "${nft.metadata.name}">
            <div class = "card-body">
                <h5 class = "card-title">${nft.metadata.name}</h5>
                <p class = "card-text">${nft.metadata.description}</p>
                <p class = "card-text">Number of Tokens in Circulation/Amount: ${nft.amount}</p>
                <p class = "card-text">Number of Owners: ${nft.owners.length}</p>
                <p class = "card-text">Your Balance: ${ownerData[nft.token_id]}</p>
                <a href="/mint.html?nftId=${nft.token_id}" class = "btn btn-primary">Mint</a>
                <a href="/transfer.html?nftId=${nft.token_id}" class = "btn btn-primary">Transfer</a>
            </div>
        </div>
        `
        let col = document.createElement("div");
        col.className = "col col-md-3";
        col.innerHTML = htmlString;
        parent.appendChild(col);
        //Now, add this htmlString Card to our index.html file
        //So now, even if we mint more NFTs, we can automatically loop through them, get all the metadata and print them out here
        //A good start to the NFT dashboard
        //We can also add some more stats to our NFT Dashboard - get info about the ownership (how many players own the NFT, current supply of NFT, the NFT owner address)
        //We can use a Moralis API call and add all those details to our cards above
        //Go to Moralis documentation -> Web3 API -> Web3API.token -> getTokenIdOwners
        //This API endpoint will get us the array of all owners of NFT items within our contract
        
    }

}

//getOwnerData function
async function getOwnerData(){

    //Use Moralis to get the current signed-in Metamask Account - without using web3
    let accounts = currentUser.get("accounts");

    //Moralis Docs -> Web3 API -> Web3API.account -> getNFTsForContract function
    const options = {
        chain: "rinkeby",
        address: accounts[0],
        token_address: CONTRACT_ADDRESS,
      };
      return Moralis.Web3API.account.getNFTsForContract(options)
        .then((data) => {
            //We are going to populate this object for each element in the array
            let result = data.result.reduce( (object, currentElement) => {
                object[currentElement.token_id] = currentElement.amount;
                return object;
            }, {} )
            return result;
        });
}


//Fixing the Login button to facilitate Metamask login
async function login() {
    try {
        //Let's fetch the current user first; in order to check whether the user is logged in or not
        currentUser = Moralis.User.current();

        //We are checking whether the currentUser exists or not
        //If the current user doesn't exist, it means we need to Sign-In
        //If the currentUser exists, we can continue
        if(!currentUser){
            //To sign-in - authenticate using Metamask
            //Moralis.Web3.authenticate() returns a Promise; so we are using await in order to use that object later on
            currentUser = await Moralis.authenticate();
        }

        //Sign-in is successful and the app has initialized
        //Let's call a function to get all NFTs
        //We are using the function "getAllTokenIds" from Moralis Web3API docs to retrieve all tokenIDs for a specific address of the smart contract
        //The address should be the "Token contract address"

        const options = { address : CONTRACT_ADDRESS, chain : "rinkeby",};
        const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
        //Let's call the fetchNFTMetadata here and console log the result
        let NFTWithMetadata = await fetchNFTMetadata(NFTs.result);
        //This will include the entire NFT object and all of the metadata
        // console.log(NFTWithMetadata); 
        let ownerData = await getOwnerData();
        //Now, we can use this NFTWithMetadata to start putting something on the screen
        //After creating the function renderInventory(NFTs), let's now call it here so that the result will be reflected in the front-end
        renderInventory(NFTWithMetadata, ownerData);
 
    } catch (error) {
        console.log(error);
    }
}

//Log out 
async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
  }

  
//The login() function gets called automatically whenever the user clicks the "Sign In With Metamask" button on the front-end
document.getElementById("login_button").onclick = login;
document.getElementById("logout_button").onclick = logOut;

//We can use the Web3API functionality of Moralis Admin Dashboard too. 
//Check out Moralis docs for Web3API and explore what you need to retrieve from Moralis