//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract KotET is Ownable {
    using Address for address payable;
    address payable public king;
    uint256 public claimPrice;

    constructor() {
        king = payable(msg.sender);
    }

    receive() external payable {
        require(msg.value > claimPrice, "Not enpough Ether");
        address payable overthrownKing = king;
        king = payable(msg.sender);
        claimPrice = msg.value;

        uint256 fee = (claimPrice / 100) * 2;
        uint256 compensation = claimPrice - fee;

        payable(owner()).sendValue(fee);
        overthrownKing.sendValue(compensation);
    }
}
