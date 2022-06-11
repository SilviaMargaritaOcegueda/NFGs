// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Import ERC1155 token contract from Openzepplin
import "./ERC1155.sol";
import "./Ownable.sol";
import "./console.sol";

//Define our contract
contract TennisNFT is ERC1155, Ownable {

    address public admin;

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
    constructor() ERC1155("https://5uzummvznv3l.usemoralis.com/{id}.json") {

        admin = msg.sender;
        //Call the _mint() function of ERC1155 in order to mint the initial NFTs
        //_mint() accepts parameters - account(initial owner of these NFTs), id, amount, data (only for internal purpose)
        //Creates 'amount' of tokens of token type 'id' and assigns them to 'account'
        _mint(admin, WHITE, whiteIdInitialCount, "");
        _mint(admin, BRONZE, bronzeIdInitialCount, "");
        _mint(admin, SILVER, silverIdInitialCount, "");
        _mint(admin, GOLD, goldIdInitialCount, "");

    }

    //We are going to create a mint() function that will allow the user to mint more NFTs in the future
    //_mint() of ERC1155 is an internal function which can't be called from the outside. Let's wrap around it within our mint() function
    //This mint() function can be called by anyone. We need to impose a restriction so that only the owner of the contract can call the mint() function
    //This can be accomplished by the OpenZepplin Ownable Smart Contract. Import it
    function mint(address account, uint256 id, uint256 amount) public onlyOwner {
        _mint(account, id, amount, "");
    } 

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
        safeTransferFrom(from, to, id, amount, "");
    }
}