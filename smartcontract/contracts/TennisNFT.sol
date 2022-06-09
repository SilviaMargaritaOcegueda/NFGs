// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

//Import ERC1155 token contract from Openzepplin
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

//Define our contract
contract TennisNFT is ERC1155, Ownable {
    string public name = "Tennis NFT from NFGs";
    //Defining the ID for each NFT - for internal use
    uint public constant WHITE = 0;
    uint public constant BRONZE = 1;
    uint public constant SILVER = 2;
    uint public constant GOLD = 3;

    //Define our constructor - It will mint the initial version of the above NFTs
    //ERC1155 constructor argument accepts a string memory argument named 'uri_' - The URI to our NFT metadata
    //URI- We need to provide where our metadata will be hosted 
    //constructor() ERC1155("https://5uzummvznv3l.usemoralis.com/{id}.json") {
    constructor() ERC1155("ipfs://bafybeifhp22axkn2g22vtqwgcgx2jkd3ssp6poxbdoyzhb6ktjtq2agzxu/{id}.json") {
        //Call the _mint() function of ERC1155 in order to mint the initial NFTs
        //_mint() accepts parameters - account(initial owner of these NFTs), id, amount, data (only for internal purpose)
        //Creates 'amount' of tokens of token type 'id' and assigns them to 'account'
        _mint(msg.sender, WHITE, 3, "");
        _mint(msg.sender, BRONZE, 6, "");
        _mint(msg.sender, SILVER, 1, "");
        _mint(msg.sender, GOLD, 5, "");

    }

    //We are going to create a mint() function that will allow the user to mint more NFTs in the future
    //_mint() of ERC1155 is an internal function which can't be called from the outside. Let's wrap around it within our mint() function
    //This mint() function can be called by anyone. We need to impose a restriction so that only the owner of the contract can call the mint() function
    //This can be accomplished by the OpenZepplin Ownable Smart Contract. Import it
    function mint(address account, uint256 id, uint256 amount) external onlyOwner {
        _mint(account, id, amount, "");
    } 

    //Only the token owner should have the privilege to burn the token
    //The contract owner shouldn't be able to just burn anyone else's token
    function transfer(address _from, address _to, uint256 id, uint256 amount) external onlyOwner{
        _safeTransferFrom(_from, _to, id, amount, "0x");
    }

    // opensea supported metadata
//   function uri(uint256 tokenId) override public view returns (string memory) {
//        return(
//            string(abi.encodePacked(
//                "https://bafybeigsfkis362b7jnnnwx4pkngayza3b3xgjiv62kcood4yhsgco3dva.ipfs.nftstorage.link/",
//                Strings.toString(tokenId),
//                "json"
//            )
//        ),
//    }

    // data on ipfs: 
    //CID bafybeigsfkis362b7jnnnwx4pkngayza3b3xgjiv62kcood4yhsgco3dva
    //https://bafybeigsfkis362b7jnnnwx4pkngayza3b3xgjiv62kcood4yhsgco3dva.ipfs.nftstorage.link/
    //ipfs://bafybeigsfkis362b7jnnnwx4pkngayza3b3xgjiv62kcood4yhsgco3dva
    //ipfs://bafyreifsig5a4ujmfeyjfidtnwvjeeukvnwvvefiumvcx2kv2l4cnaxztu/metadata.json
    //https://bafybeigsfkis362b7jnnnwx4pkngayza3b3xgjiv62kcood4yhsgco3dva.ipfs.nftstorage.link/BronzeLeague.png
    //https://bafybeigsfkis362b7jnnnwx4pkngayza3b3xgjiv62kcood4yhsgco3dva.ipfs.nftstorage.link/GoldLeague.png
    //https://bafybeigsfkis362b7jnnnwx4pkngayza3b3xgjiv62kcood4yhsgco3dva.ipfs.nftstorage.link/SilverLeague.png
    //https://bafybeigsfkis362b7jnnnwx4pkngayza3b3xgjiv62kcood4yhsgco3dva.ipfs.nftstorage.link/WhiteLeague.png
}