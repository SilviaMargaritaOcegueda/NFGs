// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/Ownable.sol";

// Contract for sports club to register Athelets.
contract AthleteRegistration is Ownable {
  
  // This is a helper for seting the unique id
  // it is automatically initialized by 0. 
  uint32 idCounter;
  
  // These are the sorts of NFTs that can be minted.
  enum Sorts { white, bronze, silver, gold }

  // Event for the succesful registration of a new Athelte.
  event NewAthlete(uint athleteId, string name);
  event AtheltesToInterface(uint athleteId, address athleteWallet, string name, uint32 tournaments, uint32 trainings);
  
  // Struct of Athelte with specific information of the athlete.
  struct Athlete {
    uint athleteId;
    string name;
    address athleteWallet;
    Sorts nftSort;
    uint32 tournaments;
    uint32 trainings;
  }


  // Array of athelets with its specifc data of the Athlete.
  Athlete[] athletes;

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
  function registerAthlete(string memory _name, address _athleteWallet) external uniqueWallet( _athleteWallet) onlyOwner {
  //function registerAthlete(string memory _name, address _athleteWallet) external onlyOwner {
    // Generate a new Athlete register including the inputs from the owner stored in memory.
    // Set a constant is more efficient than requesting a variable from the contract.
    idCounter++;
    athletes.push(Athlete({
      athleteId: idCounter,
      name: _name,
      athleteWallet: _athleteWallet,
      nftSort: Sorts.white,
      tournaments: 0,
      trainings: 0
    }));
    // Push the new Athelte into the array of athletes.
    //athletes.push(_newAthlete);
    // Set wallet address for the athlete ID.
    athleteWalletToAthleteId[_athleteWallet] = idCounter;
    // Emit event to the front end.
    emit NewAthlete(idCounter, _name);
  }
  // choose visebility
  function structOfAthelte(address _walletaddress) public {
    uint256 _id = athleteWalletToAthleteId[_walletaddress];
    Athlete storage athlete = athletes[_id-1];
    emit AtheltesToInterface(athlete.athleteId, athlete.athleteWallet, athlete.name, athlete.tournaments, athlete.trainings);
    //return athlete;
  }
  // should cost no gas?
  function getArrayOfAtheltes() public view returns (Athlete[] memory) {
    Athlete[] storage athletesArray = athletes;
    return athletesArray;
  }
  
  // helper functions
  function getCounter() public view returns (uint32) {
    return idCounter;
  }
}