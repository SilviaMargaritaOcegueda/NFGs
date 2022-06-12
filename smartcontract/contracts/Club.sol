// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import './AthleteRegistration.sol';
import './TennisNFT.sol';


contract Club is AthleteRegistration, TennisNFT {
  
  using SafeMath for uint;

  // The club admin declare how many session trainings 
  // have place on a whole season.
  uint32 public trainingsPerYear;
  
  // The club admin declare how many extra sessions wants 
  // to assign an athlete for participating on a tournament.
  uint32 public pointsPerTournament;
  
  // Public counter that stores the quantity of each 
  // NFT sort earned by the athletes. 
  // Admin can consult this information any time after 
  // caling the updateNftSort function
  uint32 public whiteCounter;
  uint32 public bronzeCounter;
  uint32 public silverCounter;
  uint32 public goldCounter;
  
  // Map that holds the minimum percentaje of 
  // attendance to get the respective NFT sort.
  mapping ( bytes32 => uint32 ) public minimums;
  
  // Event that notifies that the NFT sorts has been 
  // updated for all registered athletes.
  event updatedNftSort(uint athleteId, string nftSort);

  constructor(uint32 _trainingsPerYear, uint32 _pointsPerTournament) {    
    setSeason(_trainingsPerYear,  _pointsPerTournament);
    // Calculate and set the minimum of attendances to 
    // trainning sessions that each sort of NFT implies.
    // "gold" NFT(converted to bytes32) is earned when attending 90% of the sessions or more. 
    minimum[0x676f6c64000000000000000000000000000000000000000000000000000000] = _trainingsPerYear * 90 / 100;
    // "silver" NFT is aerned when attending 70% of the sessions or more.
    minimum[0x73696c76657200000000000000000000000000000000000000000000000000] = _trainingsPerYear * 70 / 100;
    // "bronze" NFT is aerned when attending 60% of the sessions or more.
    minimum[0x62726f6e7a6500000000000000000000000000000000000000000000000000] = _trainingsPerYear * 60 / 100; 
  }

  function setSeason(uint32 _trainingsPerYear, uint32 _pointsPerTournament) private {
    pointsPerTournament = _pointsPerTournament;
    trainingsPerYear = _trainingsPerYear;
  }

  // The admin can update the records by incrementing the number of 
  // attendances and tournaments joined.
  function incrementRecords(uint _athleteId, uint32 _tournaments, uint32 _trainings) external onlyOwner {
    athletes[_athleteId-1].tournaments += _tournaments;
    athletes[_athleteId-1].trainings += _trainings;
  }

  // It sets, to each athlete, the NFT sort according to its
  // last records, mint all the NFTs, reset the athletes records, 
  // the NFT counters and just then, to avoid reentrancy, transfers
  // all the NFTs to the atheltes based on the kind of NFT each athlete 
  // shall receive.
  function mintAndTransferNfts() external onlyOwner{
    updatedNftSort();
    batchMint();
    resetRecords();
    resetCounters();
    transferAll();
  }
  
  // The admin can trigger the calculation of attendances of each 
  // athlete and update the sort of NFT earned.
  function updateNftSort() public onlyOwner {
    // for each athelte in the athletes array
    for (uint i; i < athletes.length; i++) {
      // If the amount of trainings is higher than the percentag to reach
      // set nftSort in athletes array to gold and increments the global 
      // amount of gold NFTs for minting.
      // Do the same for silver and bronce
      if((athletes[i].tournaments * pointsPerTournament + athletes[i].trainings) >= minimum["gold"]) {
        athletes[i].nftSort = Sorts.gold;
        goldCounter++;
      } else if((athletes[i].tournaments * pointsPerTournament + athletes[i].trainings) >= minimum["silver"]) {
        athletes[i].nftSort = Sorts.silver;
        silverCounter++;
      } else if((athletes[i].tournaments * pointsPerTournament + athletes[i].trainings) >= minimum["bronze"]) {
        athletes[i].nftSort = Sorts.bronze;  
        bronzeCounter++;
      }
      athletes[i].nftSort = Sorts.white;
      whiteCounter++;    
        
      emit updatedNftSort(athletes[i].athleteId, athletes[i].nftSort);
    }  
  }
  
  //Call the mint function from the TennisNFT contract
  // to batch mint NFT based on the count per NFT sort.  
  function batchMint() private {
    mint(msg.sender, WHITE, whiteCounter);
    mint(msg.sender, BRONZE, bronzeCounter);
    mint(msg.sender, SILVER, silverCounter);
    mint(msg.sender, GOLD, goldCounter);
  }

  // Reset function clears records from the last season and the 
  // NFT to white. For the time when the NFT was succesfully minted 
  function resetRecords() private {
    for (uint i; i < athletes.length; i++) {
      // Delete records in the athletes array
      athletes[i].tournaments = 0;
      athletes[i].trainings = 0;
      // Set NFT sort to white
      athletes[i].nftSort = Sorts.white;
    }  
  }

  // Clear the NFT counters after minting the season's NFTs
  function resetCounters() private {
    whiteCounter = 0;
    bronzeCounter = 0;
    silverCounter = 0;
    goldCounter = 0;
  }

  // It goes through each athlete data and tranfers him 1 NFT
  function transferAll() private {
    for (uint i; i < athletes.length; i++) {
    transferNFT(msg.sender, athletes[i].athleteWallet, athletes[i].nftSort, 1)
    }
  }  
}