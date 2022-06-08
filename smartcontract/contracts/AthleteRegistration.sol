// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import "./Club.sol";

contract AthleteRegistration is Ownable {

  using SafeMath for uint32;

  event NewAthlete(uint athleteId, bytes32 name);

  

  struct Athlete {
    uint athleteId;
    bytes32 name;
    address athleteWallet;
    NftSort nftSort;
    uint32 tournaments;
    uint32 trainings;
  }

  Athlete[] public athletes;

  mapping ( address => uint) public athleteWalletToAthleteId;
  mapping (uint => Athlete) public athleteIdToAthlete;

  function registerAthlete(uint _athleteId, bytes32 _name, address _athleteWallet) external onlyOwner {
    athletes.push(Athlete(_athleteId, _name, _athleteWallet, NftSort.white, 0, 0));
    athleteWalletToAthleteId[_athleteWallet] = _athleteId;
    emit NewAthlete(_athleteId, _name);
  }
}