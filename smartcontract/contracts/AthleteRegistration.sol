// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// contract for sports club to register Athelets
contract AthleteRegistration is Ownable {
  
  string[4] nftSorts = [ "white", "bronze", "silver", "gold" ];
  
  // event for the succesful registration of a new Athelte
  event NewAthlete(uint athleteId, string name);
  
  // struct of Athelte with specific information of the athlete
  struct Athlete {
    uint athleteId;
    string name;
    address athleteWallet;
    string nftSort;
    uint32 tournaments;
    uint32 trainings;
  }


  // array of athelets with its specifc data of the Athlete
  Athlete[] athletes;

  // mapping of wallet address from athelte to ID of the Athlete
  mapping ( address => uint) public athleteWalletToAthleteId;

  // mapping of ID of the Athlete to Athelte data.
  mapping (uint => Athlete) public athleteIdToAthlete;

 /** 
    * @dev modifier to check that a specifc _athleteId is not there already
    */  
 //   modifier athleteIdCheck(uint _athleteId) { 
 //       require(
 //           athleteWalletToAthleteId[_athleteId] ,
 //           "AthelteID not unique"
 //       );
 //       _;
 //   }
 // TO DO: add modifier to function after external: athleteIdCheck(_athleteId)

  // function to register a new Athelet based on input variables
  function registerAthlete(string memory _name, address _athleteWallet) external onlyOwner {
    // generate a new Athlete register including the inputs from the owner stored in memory.
    uint newId = athletes.length + 1;
    Athlete memory _newAthlete = Athlete(newId, _name, _athleteWallet, nftSorts[0], 0, 0);
    // push the new Athelte into the array of athletes.
    athletes.push(_newAthlete);
    // require athlete wallet not exists yet!
    // set wallet address for the athlete ID
    athleteWalletToAthleteId[_athleteWallet] = newId;
    // set athlete ID for the new Athlete
    // require athlete id not exists yet!
    athleteIdToAthlete[newId] = _newAthlete;
    // emit event of succesful registration to the frontend
    emit NewAthlete(newId, _name);
  }
}