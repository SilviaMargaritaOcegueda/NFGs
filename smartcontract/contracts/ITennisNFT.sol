// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITennisNFT {
    function mint(
        address account, 
        uint256 id, 
        uint256 amount
    ) external;
}