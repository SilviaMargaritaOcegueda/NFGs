// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

// contract for sports club to register Athelets 
// 
contract AthleteRegistration is Ownable {

  //using SafeMath for uint32;
  
  //should be set to enum cause of efficincy
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
  // array of athelets with its sepcifc content of the Athlete
  Athlete[] public athletes;
  // mapping of address from athelte to wallet id of the Athlete
  mapping ( address => uint) public athleteWalletToAthleteId;
  // mapping of ID of the Athlete given from club to Athelte on chain
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

  // function to register a new Athelet based on input vairables
  function registerAthlete(uint _athleteId, string memory _name, address _athleteWallet) external  onlyOwner {
    // generate a new Athlete struct in memory and add values to the memory struct
    Athlete memory _newAthlete = Athlete(_athleteId, _name, _athleteWallet, nftSorts[0], 0, 0);
    // push Athelte into the array of athletes pn chain
    athletes.push(_newAthlete);
    // require athlete wallet not exists yet!
    // set address mapping to the athlete 
    athleteIdToAthlete[_athleteId] = _newAthlete;
    // set mapping to athlete id given from input
    // require athlete id not exists yet!
    athleteWalletToAthleteId[_athleteWallet] = _athleteId;
    // emit event of succesful registration for the frontend
    emit NewAthlete(_athleteId, _name);
  }

}