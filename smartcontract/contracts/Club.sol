// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import "./AthleteRegistration.sol";

contract Club is AthleteRegistration {
    
    using SafeMath for uint32;

    uint32 trainingsPerYear;
    uint32 pointsPerTournament;
    enum NftSort { white, bronze, silver, gold }

    mapping ( NftSort => uint32 ) private percentage;
    
//   address[] public whites;
//   address[] public bronzes;
//   address[] public silvers;
//   address[] public goldens;

    constructor(uint32 _trainingsPerYear, uint32 _pointsPerTournament) {
      percentage[NftSort.bronze] = (>=60 <70));
    }

    function resetRecords() external onlyOwner {
      for (uint i; i < athletes.length; i++) {
        athletes[i].tournaments = 0;
        athletes[i].trainings = 0;
        athletes[i].nftSort = NftSort.white;
      }  
    }

    function incrementRecords(uint _athleteId, uint32 _tournaments, uint32 _trainings) external onlyOwner {
      athleteIdToAthlete[_athleteId].tournaments.add(_tournaments);
      athleteIdToAthlete[_athleteId].trainings.add(_trainings);     
    }

    function updateNftSort() internal onlyOwner {
      for (uint i; i < athletes.length; i++) {
        if {
          athletes[i].tournaments + athletes[i].tournaments . 0;

        }
          athletes[i].trainings = 0;
          athletes[i].nftSort = NftSort.white;
      }  
    }




}