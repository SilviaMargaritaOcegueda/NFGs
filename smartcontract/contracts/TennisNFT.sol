// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Import ERC1155 token contract from Openzepplin
import "../node_modules/@openzeppelin/contracts/token/ERC1155";
import "../node_modules/@openzeppelin/contracts/access/Ownable";
import "../node_modules/hardhat/console.sol";

//Define our contract
contract TennisNFT is ERC1155, Ownable {

    address public admin;
    uint public maxPerWallet;
   
    //Setting the maximum number of tokens in each category
    uint[] supplies = [50, 50, 50, 50];

    //To keep track of the total number of tokens that have been minted
    uint[] minted = [whiteIdInitialCount, bronzeIdInitialCount, silverIdInitialCount, goldIdInitialCount];
    
    //Defining the base token URI
    string internal baseTokenURI = "https://5uzummvznv3l.usemoralis.com/{id}.json";

    //Defining the ID for each NFT - for internal use
    uint public constant WHITE = 0;
    uint public constant BRONZE = 1;
    uint public constant SILVER = 2;
    uint public constant GOLD = 3;

    //Determining the number of tokens to be minted during deployment
    uint public constant whiteIdInitialCount = 45;
    uint public constant bronzeIdInitialCount = 15;
    uint public constant silverIdInitialCount = 15;
    uint public constant goldIdInitialCount = 15;

    //Define our constructor - It will mint the initial version of the above NFTs
    //ERC1155 constructor argument accepts a string memory argument named 'uri_' - The URI to our NFT metadata
    //URI- We need to provide where our metadata will be hosted 
    constructor() ERC1155(baseTokenURI) {

        admin = msg.sender;
        maxPerWallet = 1;
        //Call the _mint() function of ERC1155 in order to mint the initial NFTs
        //_mint() accepts parameters - account(initial owner of these NFTs), id, amount, data (only for internal purpose)
        //Creates 'amount' of tokens of token type 'id' and assigns them to 'account'
        _mint(admin, WHITE, whiteIdInitialCount, "");
        _mint(admin, BRONZE, bronzeIdInitialCount, "");
        _mint(admin, SILVER, silverIdInitialCount, "");
        _mint(admin, GOLD, goldIdInitialCount, "");

    }

    //Sets a new URI for all token types, by relying on the token type ID substitution mechanism
    //By this mechanism, any occurrence of the `\{id\}` substring in either the
     //* URI or any of the amounts in the JSON file at said URI will be replaced by
     //* clients with the token type ID.
    function setURI(string memory baseTokenURI) public onlyOwner{
        _setURI(baseTokenURI);
    }

    //We are going to create a mint() function that will allow the user to mint more NFTs in the future
    //_mint() of ERC1155 is an internal function which can't be called from the outside. Let's wrap around it within our mint() function
    //This mint() function can be called by anyone. We need to impose a restriction so that only the owner of the contract can call the mint() function
    //This can be accomplished by the OpenZepplin Ownable Smart Contract. Import it
    function mint(address account, uint256 id, uint256 amount) public onlyOwner {
        //Checking if the right tokenID is passed as input
        require(id < supplies.length, "NFT Category doesnot exist - invalid TokenID");
        require(id >= 0, "NFT Category doesnot exist - invalid TokenID");
        //Checking whether we are minting above the total limit
        require(minted[id] + amount <= supplies[id], "Not enough supply");
        _mint(account, id, amount, "");
        //Updated the minted[] array to reflect the newly minted token
        minted[id] += amount;
    } 

    // //Batch mint
    // function mintBatch(
    //     address to,
    //     uint256[] memory ids,
    //     uint256[] memory amounts
    // ) public onlyOwner{
    //     _mintBatch(to, ids, amounts, "");
    // }

    //Only the contract owner should have the privilege to burn the token
    function burn(address account, uint256 id, uint256 amount) public onlyOwner{
        
        _burn(account, id, amount);
    }

    //Check the account balance
    function checkBalanceOf(address account, uint256 id) public view returns (uint256) {
        return balanceOf(account, id);
    }

    //Transfer NFTs between accounts - Only the admin can transfer NFTs
    function transferNFT(
        address from,
        address to,
        uint256 id,
        uint256 amount
    ) public onlyOwner{
        uint tokenCountOfPlayer = checkBalanceOf(to, id);
        require(tokenCountOfPlayer <= maxPerWallet, "Each player can own only one NFT");
        safeTransferFrom(from, to, id, amount, "");
    }

    //Returns the URI associated with each tokenID
    function getURI(uint256 id) public {
        uri(id);
    }
}