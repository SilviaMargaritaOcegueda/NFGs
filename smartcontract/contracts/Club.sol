// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import './AthleteRegistration.sol';

contract Club is AthleteRegistration {
    
  using SafeMath for uint32;
  using SafeMath for uint;

  uint32 trainingsPerYear;
  uint32 pointsPerTournament;
  
  event updatedNftSort(uint athleteId, string nftSort);

  mapping ( string => uint32 ) private percentage;

  constructor(uint32 _trainingsPerYear, uint32 _pointsPerTournament) {
    pointsPerTournament = _pointsPerTournament;
    percentage["gold"] = _trainingsPerYear * 90 / 100;
    percentage["silver"] = _trainingsPerYear * 70 / 100;
    percentage["bronze"] = _trainingsPerYear * 60 / 100; 
  }

  function resetRecords() external onlyOwner {
    for (uint i; i < athletes.length; i++) {
      athletes[i].tournaments = 0;
      athletes[i].trainings = 0;
      athletes[i].nftSort = nftSorts[0];
      athleteIdToAthlete[(athletes[i+1]).tournaments] = 0;
      athleteIdToAthlete[(athletes[i+1]).trainings] = 0;
      athleteIdToAthlete[(athletes[i+1]).nftSort] = nftSorts[0];
    }  
  }

  function incrementRecords(uint _athleteId, uint32 _tournaments, uint32 _trainings) external onlyOwner {
    athleteIdToAthlete[_athleteId].tournaments += _tournaments;
    athleteIdToAthlete[_athleteId].trainings += _trainings;
    athletes[_athleteId-1].tournaments += _tournaments;
    athletes[_athleteId-1].trainings += _trainings;
  }

  function updateNftSort() public onlyOwner {
    uint32 whiteCounter;
    uint32 bronzeCounter;
    uint32 silverCounter;
    uint32 goldCounter;

    for (uint i; i < athletes.length; i++) {
      if((athletes[i].tournaments.mul(pointsPerTournament) + athletes[i].tournaments) >= percentage["gold"]) {
        athletes[i].nftSort = "gold";
        athleteIdToAthlete[i+1].nftSort += "gold";
        goldCounter++;
      } else if((athletes[i].tournaments.mul(pointsPerTournament) + athletes[i].tournaments) >= percentage["silver"]) {
        athletes[i].nftSort = "silver";
        athleteIdToAthlete[i+1].nftSort += "silver"  
        silverCounter++;
      } else if((athletes[i].tournaments.mul(pointsPerTournament) + athletes[i].tournaments) >= percentage["bronze"]) {
        athletes[i].nftSort = "bronze";
        athleteIdToAthlete[i+1].nftSort += "bronze"  
        bronzeCounter++;
      } 
      athletes[i].nftSort = "white";
      athleteIdToAthlete[i+1].nftSort += "white"
      whiteCounter++;    
        
      emit updatedNftSort(athletes[i].athleteId, athletes[i].nftSort);
    }  
  }
}