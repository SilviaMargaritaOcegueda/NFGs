// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import './AthleteRegistration.sol';
import './ITennisNFT.sol';

contract Club is AthleteRegistration {
 
  // The address from the TennisNFT contract passed to the constructor
  address private tennisNftAddress;

  // The club admin declare how many session trainings 
  // have place on a whole season.
  uint32 public trainingsPerYear;
  
  // The club admin declare how many extra sessions wants 
  // to assign an athlete for participating on a tournament.
  uint32 public pointsPerTournament;
    
  // Map that holds the minimum percentaje of 
  // attendance to get the respective NFT sort.
  mapping ( Sorts => uint32 ) public minimums;

  
  // Notifies that the records and NFT sort had been updated.
  event AthleteRecordsUpdated(uint athleteId, Sorts nftSort);

  // Notifies how many NFTs has been minted.
  event Minted(uint mintCount);

  constructor(uint32 _trainingsPerYear, uint32 _pointsPerTournament, address _tennisNftAddress) {    
    setSeason(_trainingsPerYear, _pointsPerTournament);
    tennisNftAddress = _tennisNftAddress;
    // Calculate and set the minimum of attendances to 
    // trainning sessions that each sort of NFT implies.
    // "gold" NFT(converted to bytes32) is earned when attending 90% of the sessions or more. 
    minimums[Sorts.gold] = _trainingsPerYear * 90 / 100;
    // "silver" NFT is aerned when attending 70% of the sessions or more.
    minimums[Sorts.silver] = _trainingsPerYear * 70 / 100;
    // "bronze" NFT is aerned when attending 60% of the sessions or more.
    minimums[Sorts.bronze] = _trainingsPerYear * 60 / 100; 
  }

  function setSeason(uint32 _trainingsPerYear, uint32 _pointsPerTournament) private {
    pointsPerTournament = _pointsPerTournament;
    trainingsPerYear = _trainingsPerYear;
  }

  // The admin can update the records by incrementing the number of 
  // attendances and tournaments joined.
  function incrementRecords(uint _athleteId, uint32 _tournaments, uint32 _trainings) external onlyOwner {
    uint athletesIndex = _athleteId - 1;
    athletes[athletesIndex].tournaments += _tournaments;
    athletes[athletesIndex].trainings += _trainings;
    // Triggers the calculation of attendances of each 
    // athlete and update the sort of NFT earned.
    updateNftSort(athletesIndex);
    emit AthleteRecordsUpdated(_athleteId, athletes[athletesIndex].nftSort);
  }
      

  function updateNftSort(uint _athletesIndex) private {
    // Set nftSort to gold in athletes array if the amount of trainings
    //  is higher than the minimum. 
    if((athletes[_athletesIndex].tournaments * pointsPerTournament + athletes[_athletesIndex].trainings) >= minimums[Sorts.gold]) {
      athletes[_athletesIndex].nftSort = Sorts.gold;
    // Do the same for silver and bronce
    } else if((athletes[_athletesIndex].tournaments * pointsPerTournament + athletes[_athletesIndex].trainings) >= minimums[Sorts.silver]) {
      athletes[_athletesIndex].nftSort = Sorts.silver;
    } else if((athletes[_athletesIndex].tournaments * pointsPerTournament + athletes[_athletesIndex].trainings) >= minimums[Sorts.bronze]) {
      athletes[_athletesIndex].nftSort = Sorts.bronze;
    }    
  }

  // It mints the NFT and reset the athlete records for each athlete.
  function mintAndResetRecords() external onlyOwner{
    require(idCounter > 0, "Zero athletes enrolled");
    uint mintCount;
    //This is inefficient because we can run out of gas if the idCounter 
    // limit is too large. However, we didn't find a better way to iterate 
    // over the athletes array besides the loop.
    // Mentor suggestion is to set a limit of mints, this doesn't solve to ensure the minting of the whole batch 
    // uint32 public constant MAX_MINTS = 100; (It must be on the top in case we use it)
    // for(uint i = 0 ; i < MAX_MINTS ; i++ ){
    //   singleMint(i);
    //   mintCount++;
    //   resetRecords(i);
    // }
    
    for(uint i = 0; i < idCounter; i++ ){
      singleMint(i);
      mintCount++;
      resetRecords(i);
    }
    emit Minted(mintCount);
  }
  
  //Call the mint function from the ITennisNFT interface.  
  function singleMint(uint _athletesIndex) private {
    ITennisNFT(tennisNftAddress).mint(athletes[_athletesIndex].athleteWallet, uint(athletes[_athletesIndex].nftSort), 1);
  }

  // Clears records and set NFT sort to white.
  function resetRecords(uint _athletesIndex) private {
      // Delete records in the athletes array
      athletes[_athletesIndex].tournaments = 0;
      athletes[_athletesIndex].trainings = 0;
      // Set NFT sort to white
      athletes[_athletesIndex].nftSort = Sorts.white; 
  }
}