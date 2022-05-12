//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

contract LogicV2Prob {
    uint256 public x;
    uint256 public y; // this is pointing the second slot of memory which is owner in ProxyProb so it will override y

    function increaseX() external {
        x += 2;
    }

    function setY(uint256 _y) external {
        y = _y;
    }
}
