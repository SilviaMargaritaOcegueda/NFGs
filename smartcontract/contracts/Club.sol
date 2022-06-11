// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import './AthleteRegistration.sol';

contract Club is AthleteRegistration {
    
  using SafeMath for uint32;
  using SafeMath for uint;

  uint32 trainingsPerYear;
  uint32 pointsPerTournament;
  
  event updatedNftSort(uint athleteId, string nftSort);

  mapping ( string => uint32 ) private percentage;
    

  address[] public whites;
  address[] public bronzes;
  address[] public silvers;
  address[] public golds;

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
    }  
  }

  function incrementRecords(uint _athleteId, uint32 _tournaments, uint32 _trainings) external onlyOwner {
    athleteIdToAthlete[_athleteId].tournaments += _tournaments;
    athleteIdToAthlete[_athleteId].trainings += _trainings;     
  }

  function updateNftSort() public onlyOwner {
    delete whites;
    delete bronzes;
    delete silvers;
    delete golds;

    for (uint i; i < athletes.length; i++) {
      if((athletes[i].tournaments.mul(pointsPerTournament) + athletes[i].tournaments) >= percentage["gold"]) {
        athletes[i].nftSort = "gold";
        golds.push(athletes[i].athleteWallet);
      } else if((athletes[i].tournaments.mul(pointsPerTournament) + athletes[i].tournaments) >= percentage["silver"]) {
        athletes[i].nftSort = "silver";  
        silvers.push(athletes[i].athleteWallet);
      } else if((athletes[i].tournaments.mul(pointsPerTournament) + athletes[i].tournaments) >= percentage["bronze"]) {
        athletes[i].nftSort = "bronze";  
        bronzes.push(athletes[i].athleteWallet);
      } 
      athletes[i].nftSort = "white";
      whites.push(athletes[i].athleteWallet);    
        
      emit updatedNftSort(athletes[i].athleteId, athletes[i].nftSort);
    }  
  }
}