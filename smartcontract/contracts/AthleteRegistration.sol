// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// contract for sports club to register Athelets
contract AthleteRegistration is Ownable {
  
  uint32 idCounter;
  enum Sorts { white, bronze, silver, gold }
  
  // event for the succesful registration of a new Athelte
  event NewAthlete(uint athleteId, string name);
  
  // struct of Athelte with specific information of the athlete
  struct Athlete {
    uint athleteId;
    string name;
    address athleteWallet;
    Sorts nftSort;
    uint32 tournaments;
    uint32 trainings;
  }


  // array of athelets with its specifc data of the Athlete
  Athlete[] athletes;

  // mapping of wallet address from athelte to ID of the Athlete
  mapping ( address => uint) public athleteWalletToAthleteId;
  
 /** 
    * @dev modifier to check that a specifc _athleteWallet is not there already
    */  
  modifier uniqueWallet(address _athleteWallet) { 
      require(
          athleteWalletToAthleteId[_athleteWallet] > 0 ,
          "Athlete wallet not unique"
      );
      _;
  }
 

  // function to register a new Athelet based on input variables
  function registerAthlete(string memory _name, address _athleteWallet) external uniqueWallet( _athleteWallet) onlyOwner {
    // generate a new Athlete register including the inputs from the owner stored in memory.
    uint32 newId = idCounter++;
    Athlete memory _newAthlete = Athlete(newId, _name, _athleteWallet, Sorts.white, 0, 0);
    // push the new Athelte into the array of athletes.
    athletes.push(_newAthlete);
    // require athlete wallet not exists yet!
    // set wallet address for the athlete ID
    athleteWalletToAthleteId[_athleteWallet] = newId;
    // set athlete ID for the new Athlete
    // require athlete id not exists yet!
    emit NewAthlete(newId, _name);
  }

  // function for getting information for the frontend to be shown
  //  function getAtheltes() external view returns ( address[] memory,  uint[] memory) {
  //     require (athletesId > 0, "No athlete in array");
  //     address[] memory addrs = new address[](athletes.length);
  //     uint[] memory trainings = new uint[](athletes.length);

  //     for (uint i = 0; i < athletes.length; i++) {
  //         Athlete storage athlete = athletes[i];
  //         addrs[i] = athlete.athleteWallet;
  //         trainings[i] = athlete.trainings;
  //     }

  //       return (addrs, trainings);
  //   }
}