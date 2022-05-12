//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

contract AgreedPriceSol2 {
    address public owner;
    uint256 public price;

    constructor(uint256 _price) {
        owner = msg.sender;
        price = _price;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Restricted Access");
        _;
    }

    function changeOwner(address _newOwner) external onlyOwner {
        owner = _newOwner;
    }

    function updatePrice(uint256 _price) external onlyOwner {
        price = _price;
    }
}
