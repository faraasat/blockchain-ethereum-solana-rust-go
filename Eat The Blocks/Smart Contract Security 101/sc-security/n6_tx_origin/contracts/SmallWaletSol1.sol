//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

contract SmallWalletSol1 {
    address public owner;

    constructor() {
        owner = tx.origin;
    }

    function withdrawAll(address _recipient) external {
        require(msg.sender == owner, "Caller not authorized");
        payable(_recipient).transfer(address(this).balance);
    }

    receive() external payable {}
}
