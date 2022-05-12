//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/utils/Address.sol";
import "hardhat/console.sol";

contract SavingAccountsV2Sol1 {
    using Address for address payable;

    mapping(address => uint256) public balanceOf;

    function deposit() external payable {
        balanceOf[msg.sender] += msg.value;
    }

    function withdraw() external {
        require(balanceOf[msg.sender] > 0, "Nothing to Widthdraw");

        uint256 amountDeposited = balanceOf[msg.sender];

        balanceOf[msg.sender] = 0;

        console.log("");
        console.log("ReentrancyVivtim's Balance:   ", address(this).balance);
        console.log("ReentrancyAttacker's Balance: ", balanceOf[msg.sender]);
        console.log("");

        payable(msg.sender).sendValue(amountDeposited);
    }
}
