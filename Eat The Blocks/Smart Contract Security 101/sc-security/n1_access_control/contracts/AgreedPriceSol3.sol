//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AgreedPriceSol3 is Ownable {
    uint256 public price;

    constructor(uint256 _price) {
        price = _price;
    }

    function updatePrice(uint256 _price) external onlyOwner {
        price = _price;
    }
}
