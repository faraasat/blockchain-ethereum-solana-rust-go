//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

contract LogicV2Sol {
    uint256 public x;
    address public owner;
    address public logicContract;
    uint256 public y;

    function increaseX() external {
        x += 2;
    }

    function setY(uint256 _y) external {
        y = _y;
    }
}
