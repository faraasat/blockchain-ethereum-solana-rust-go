//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

contract AgreedPriceProb {
    uint256 public price;

    constructor(uint256 _price) {
        price = _price;
    }

    // Problem is here because this function is available for external use
    function updatePrice(uint256 _price) external {
        price = _price;
    }
}
