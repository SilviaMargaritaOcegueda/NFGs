// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import './AthleteRegistration.sol';

contract Club is AthleteRegistration {
    
  using SafeMath for uint32;
  using SafeMath for uint;

  // The club admin declare how many session trainings have place on a whole season.
  uint32 trainingsPerYear;
  // The club admin declare how many extra sessions wants to assign an athlete for participating on a tournament.
  uint32 pointsPerTournament;
  
  // Event that notifies that the NFT sorts has been 
  // updated for all registered athletes.
  event updatedNftSort(uint athleteId, string nftSort);

  // Map that holds the minimum percentaje of 
  // attendance to get the respective NFT sort.
  mapping ( string => uint32 ) private percentage;

  constructor(uint32 _trainingsPerYear, uint32 _pointsPerTournament) {
    pointsPerTournament = _pointsPerTournament;
    trainingsPerYear = _trainingsPerYear;
    // Calculate and set the minimum of attendances to 
    // trainning sessions that each sort of NFT implies.
    // Gold NFT is earned when attending 90% of the sessions or more. 
    percentage["gold"] = _trainingsPerYear * 90 / 100;
    // Silver NFT is aerned when attending 70% of the sessions or more.
    percentage["silver"] = _trainingsPerYear * 70 / 100;
    // Bronze NFT is aerned when attending 60% of the sessions or more.
    percentage["bronze"] = _trainingsPerYear * 60 / 100; 
  }

  // Reset function clears records from the last season and the NFT to white.
  // For the time when the NFT was succesfully minted 
  function resetRecords() external onlyOwner {
    for (uint i; i < athletes.length; i++) {
      // Delete records in the athletes array
      athletes[i].tournaments = 0;
      athletes[i].trainings = 0;
      athletes[i].nftSort = nftSorts[0];
      // Delete records in the athlete ID to Athlete mapping
      athleteIdToAthlete[i+1].tournaments = 0;
      athleteIdToAthlete[i+1].trainings = 0;
      athleteIdToAthlete[i+1].nftSort = nftSorts[0];
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
        athleteIdToAthlete[i+1].nftSort = "gold";
        goldCounter++;
      } else if((athletes[i].tournaments.mul(pointsPerTournament) + athletes[i].tournaments) >= percentage["silver"]) {
        athletes[i].nftSort = "silver";
        athleteIdToAthlete[i+1].nftSort = "silver";  
        silverCounter++;
      } else if((athletes[i].tournaments.mul(pointsPerTournament) + athletes[i].tournaments) >= percentage["bronze"]) {
        athletes[i].nftSort = "bronze";
        athleteIdToAthlete[i+1].nftSort = "bronze";  
        bronzeCounter++;
      } 
      athletes[i].nftSort = "white";
      athleteIdToAthlete[i+1].nftSort = "white";
      whiteCounter++;    
        
      emit updatedNftSort(athletes[i].athleteId, athletes[i].nftSort);
    }  
  }
}