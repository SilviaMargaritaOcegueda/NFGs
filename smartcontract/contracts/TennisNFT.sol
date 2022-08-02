// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Import ERC1155 token contract from Openzepplin
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//Define our contract
contract TennisNFT is ERC1155, Ownable {

    address public admin;

    // Giving a name to our contract
    string public name = "Tennis NFT from NFGs";

    //Defining the ID for each NFT - for internal use
    uint public constant WHITE = 0;
    uint public constant BRONZE = 1;
    uint public constant SILVER = 2;
    uint public constant GOLD = 3;

    //Define our constructor - It will mint the initial version of the above NFTs
    //ERC1155 constructor argument accepts a string memory argument named 'uri_' - The URI to our NFT metadata
    //URI- We need to provide where our metadata will be hosted 
    constructor() ERC1155("ipfs://bafybeifhp22axkn2g22vtqwgcgx2jkd3ssp6poxbdoyzhb6ktjtq2agzxu/{id}.json") {

        admin = msg.sender;
        
    }

    //We are going to create a mint() function that will allow the user to mint more NFTs in the future
    //_mint() of ERC1155 is an internal function which can't be called from the outside. Let's wrap around it within our mint() function
    //This mint() function can be called by anyone. We need to impose a restriction so that only the owner of the contract can call the mint() function
    //This can be accomplished by the OpenZepplin Ownable Smart Contract. Import it
    function mint(address account, uint256 id, uint256 amount) external {
        _mint(account, id, amount, "");
    } 

    //Only the contract owner should have the privilege to burn the token
    function burn(address account, uint256 id, uint256 amount) external{
        
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
    ) external{
        safeTransferFrom(from, to, id, amount, "");
    }

}