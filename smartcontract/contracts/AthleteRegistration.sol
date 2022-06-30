// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/Ownable.sol";

// Contract for sports club to register Athelets.
contract AthleteRegistration is Ownable {
  
  // This is a helper for seting the unique id
  // it is automatically initialized by 0. 
  uint32 public idCounter;
  
  // These are the sorts of NFTs that can be minted.
  enum Sorts { white, bronze, silver, gold }

  // Event for the succesful registration of a new Athelte.
  event NewAthleteRegistered(uint indexed athleteId, bytes32 indexed name);
  
  // Struct of Athelte with specific information of the athlete.
  struct Athlete {
    uint athleteId;
    bytes32 name;
    address athleteWallet;
    Sorts nftSort;
    uint32 tournaments;
    uint32 trainings;
  }


  // Array of athelets with its specifc data of the Athlete.
  Athlete[] public athletes;

  // Mapping of wallet address from athelte to ID of the Athlete.
  mapping ( address => uint) public athleteWalletToAthleteId;
  
 // @dev modifier to check that a specifc _athleteWallet is not there already.
  modifier uniqueWallet(address _athleteWallet) { 
      require(
          athleteWalletToAthleteId[_athleteWallet] == 0 ,
          "Athlete wallet not unique"
      );
      _;
  }
 
  // Function to register a new Athelet based on input variables.
  function registerAthlete(bytes32 _name, address _athleteWallet) external uniqueWallet( _athleteWallet) onlyOwner {
  //function registerAthlete(string memory _name, address _athleteWallet) external onlyOwner {
    // Generate a new Athlete register including the inputs from the owner stored in memory.
    // Push the new Athelte into the array of athletes.
    idCounter++;
    athletes.push(Athlete({
      athleteId: idCounter,
      name: _name,
      athleteWallet: _athleteWallet,
      nftSort: Sorts.white,
      tournaments: 0,
      trainings: 0
    }));
    //athletes.push(_newAthlete);
    // Set wallet address for the athlete ID.
    athleteWalletToAthleteId[_athleteWallet] = idCounter;
    // Emit event to the front end.
    emit NewAthleteRegistered(idCounter, _name);
  }
}