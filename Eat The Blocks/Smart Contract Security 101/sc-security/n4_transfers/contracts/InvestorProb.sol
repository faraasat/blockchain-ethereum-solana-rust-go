//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ISavingAccountsProb {
    function deposit() external payable;

    function withdraw() external;
}

contract InvestorProb is Ownable {
    ISavingAccountsProb public immutable savingAccount;

    constructor(address savingAccountAddress) {
        // point to is address at construction time
        savingAccount = ISavingAccountsProb(savingAccountAddress);
    }

    function depositIntoSavingsAccount() external payable onlyOwner {
        savingAccount.deposit{value: msg.value}();
    }

    function withdrawFromSavingsAccount() external payable onlyOwner {
        savingAccount.withdraw();
    }

    // If we not have recieve than we cannot recieve ethers
    receive() external payable {
        // without below logic ether will stuck in this contract forever known as frozen ether
        // from saving account transfer is sending a limited of 2300 gas which is not enough to perform logic of this
        payable(owner()).transfer(address(this).balance);
    }
}
