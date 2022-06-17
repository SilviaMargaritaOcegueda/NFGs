<html>
<body>
<h1>Amateur Athletes NFT</h1>
<h2>This project is aimed for Teams</h2>
<p>This project presents a proof of concept for sports teams using tennis as an example. Especially local sports clubs suffer from the phenomenon of not having enough players for team matches and trainings. In our Tennis NFT project we offer a way to improve this by awarding NFTs to players based on their participation. Players who regularly participate in trainings and tournaments receive points. They can reach different stages and are rewarded with an NFT at the end of a season. The NFT is then incentivized  by the local sports club and their sponsors. It is up to the sports club to decide how the payment is made.</p>
<p>There are two main folders - <code>tennis-nft</code> (front-end) and <code>smartcontract</code> (back-end) </p>
<p>If you want to have a closer look at our first project together you have to do the following: </p>
<p>Preconditions: node is installed, hardhat is installed. If not, do it now! Therefore you can follow https://nodejs.org/de/download/ and https://hardhat.org/getting-started if you are on windows please follow https://docs.microsoft.com/en-us/windows/wsl/install in advance otherwise it could be become very wired.</p>
<p>Clone our repository to your local environment.</p>

<h3>Backenend</h3>
<p>><code>cd smartcontract</code></p>
<p>><code>npm install</code></p>
<p>now you can already compile our contratcs to do so use the following command:</p>
<p>><code>npx hardhat compile</code></p>
<p>If you want to see if our unit tests work for you then do the following:</p>
<p>><code>npx hardhat test</code></p>
<p>Now you are probably asking yourself, how do you get our contracts on a test network, yes guessed right, we will explain that to you now: 
first of all you need Meta Mask and Rinkeby. You can simply add Meta Mask to your browser. Then you need your private key. In this Youtube video you can find out how to get it, if you don't know:  https://www.youtube.com/watch?v=dSx14epF1lc</p>
<p>If you want to see if our unit tests work for you then do the following:</p>
<p>PRIVATE_KEY=""</p>
<p>API_URL_RINKEBY=""</p>
<p>NFT_STORAGE_API_KEY=""</p>
<p>API_URL_ETHERSCAN=""</p>
<p>You have already found the private key in the meta mask, please enter it between the brackets at PRIVATE_KEY.</p>
<p>You can create the API_URL_RINKEBY by following this tutorial https://docs.infura.io/infura/getting-started  up to and including point 3 3. Create a project on another network. Then copy the endpoint, which looks like this: https://rinkeby.infura.io/v3/d736914hfeqibf39873 into your variable.</p>
<p>Now you need the NFT_STORAGE_API_KEY from the NFT storage. The easiest way is:</p>
<p>- go to https://nft.storage/</p>
<p>- log in</p>
<p>- click on API</p>
<p>- click on New Api Key, give a project name e.g. Tennis NFT and create. Then you can copy the key from the interface into the API_URL_RINKEBY.</p>
<p>Almost done. We are only missing the API_URL_ETHERSCAN. You can get it if you go to https://etherscan.io/. Log in on the top right and then click on API Keys in the bar on the left, which is currently located at Others. Again, create your own key by clicking on the "+ Add" button, assign project name and copy and paste the Api Key Token. Very good you dear ones. </p>
<p>Another small addition our NFTs for this project are on ipfs. In the json files in the TennisNFT used link is the link to the images. The images then result with the meta data (json) the NFT. We used the ERC1155 because we have different types of NFTs: White, Bronze, Silver and Gold. Gold of course for the players who supported the club the most with their presence. </p>
<p>Now we come to the deployment on the rinkeby network. To do this, run the following in the smart contract folder: </p>
<p>><code>npx hardhat run scripts/deploy.js --network rinkeby</code></p>
<p>you will get the contract address as response. Copy it! We will need it in a moment. The output in the console looks like this: 
Club Address is : 0xD49450E0110b8EB3.…</p>
<p>Now you have to verify the contract. To do this, call the following in the command line with your contract address: </p>
<p>><code>npx hardhat verify --network rinkeby --constructor-args arguments/club.arguments.js  0xD49450E0110b8EB3…</code></p>
<p>PS. we need the Contract address right away again, but let's switch to the frontend first ;)</p>
<h3>Frontend</h3>
<p>do the following in the console:</p>
<p>><code>cd ..</code></p>
<p>><code>cd tennis-nft</code></p>
<p>then directly have everything installed again with</p>
<p>><code>npm install</code></p>
<p>Now you need your contract address again. Go to the src folder and enter it at App.js
const CONTRACT_ADDRESS = "0xD49450E0110b8EB3...";</p>
<p>The same again for the Athlete.js file:</p>
<p>><code>cd Athlete</code></p>
<p>Open file and customize.
const CONTRACT_ADDRESS = "0xD49450E0110b8EB3...";</p>
<p>Now you are ready to go: 
back to the src folder</p>
<p>><code>cd .. </code></p>
<p>and again back to the tennis-nft folder</p>
<p>><code>cd .. </code></p>
<h4>AND:</h4>
<p>><code>npm start</code></p>

<p>PS. to make the frontend runnable, we copied our ABI from the folder smartcontract/artifacts/contracts/Club.sol/Club.json into the src folder from tennis-nft But it is the same for you, if you don't change anything in thecontract :) Have fun trying it out ;)</p>
<p>PPS. If you are better in frontend than we are happy about optimization and feedback maybe to generate a MVP :) </p>
</body>
</html>