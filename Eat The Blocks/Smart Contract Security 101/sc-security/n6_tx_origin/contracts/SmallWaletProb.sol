//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

contract SmallWalletProb {
    address public owner;

    constructor() {
        owner = tx.origin;
    }

    function withdrawAll(address _recipient) external {
        // tx.origin should not be used for authorization
        require(tx.origin == owner, "Caller not authorized");
        payable(_recipient).transfer(address(this).balance);
    }

    receive() external payable {}
}
