// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/Ownable.sol";

// contract for sports club to register Athelets
contract AthleteRegistration is Ownable {

  address public admin;

  enum Sort {white, silver, bronce, gold}
  uint32 athletesId;

  // event for the succesful registration of a new Athelte
  event NewAthlete(uint athleteId, string name);
  
  // struct of Athelte with specific information of the athlete
  struct Athlete {
    uint athleteId;
    string name;
    address athleteWallet;
    Sort nftSort;
    uint32 tournaments;
    uint32 trainings;
  }


  // array of athelets with its specifc data of the Athlete
  Athlete[] athletes;

  // mapping of wallet address from athelte to ID of the Athlete
  mapping ( address => uint) public athleteWalletToAthleteId;

  // mapping of ID of the Athlete to Athelte data.
  mapping (uint => Athlete) public athleteIdToAthlete;

  constructor() {
        admin = msg.sender;
        athletesId = 0;
    }

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
    athletesId++;
    Athlete memory _newAthlete = Athlete(athletesId, _name, _athleteWallet, Sort.white, 0, 0);
    // push the new Athelte into the array of athletes.
    athletes.push(_newAthlete);
    // require athlete wallet not exists yet!
    // set wallet address for the athlete ID
    athleteWalletToAthleteId[_athleteWallet] = athletesId;
    // set athlete ID for the new Athlete
    // require athlete id not exists yet!
    athleteIdToAthlete[athletesId] = _newAthlete;
    // emit event of succesful registration to the frontend
    emit NewAthlete(athletesId, _name);
  }

  function getAthleteName(address _athleteWallet) external view returns (uint){
    uint id = athleteWalletToAthleteId[_athleteWallet];
    return id;
  }

  // function for getting information for the frontend to be shown
   function getAtheltes() external view returns ( address[] memory,  uint[] memory) {
      require (athletesId > 0, "No athlete in array");
      address[] memory addrs = new address[](athletes.length);
      uint[] memory trainings = new uint[](athletes.length);

      for (uint i = 0; i < athletes.length; i++) {
          Athlete storage athlete = athletes[i];
          addrs[i] = athlete.athleteWallet;
          trainings[i] = athlete.trainings;
      }

        return (addrs, trainings);
    }
}