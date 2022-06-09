// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract AthleteRegistration is Ownable {

  using SafeMath for uint32;
  
  string[4] nftSorts = [ "white", "bronze", "silver", "gold" ];
  event NewAthlete(uint athleteId, string name);
  
  struct Athlete {
    uint athleteId;
    string name;
    address athleteWallet;
    string nftSort;
    uint32 tournaments;
    uint32 trainings;
  }

  Athlete[] public athletes;

  mapping ( address => uint) public athleteWalletToAthleteId;
  mapping (uint => Athlete) public athleteIdToAthlete;

  function registerAthlete(uint _athleteId, string memory _name, address _athleteWallet) external onlyOwner {
    Athlete memory _newAthlete = Athlete(_athleteId, _name, _athleteWallet, nftSorts[0], 0, 0);
    athletes.push(_newAthlete);
    athleteWalletToAthleteId[_athleteWallet] = _athleteId;
    emit NewAthlete(_athleteId, _name);
  }
}