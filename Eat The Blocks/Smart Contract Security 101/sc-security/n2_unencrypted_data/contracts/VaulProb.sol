//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract VaultProb is Ownable {
    // there is also the arrangement of storage in ethereum which lets an attacker view also the private variables
    bytes32 private password; // Solidity has no string matching capability yet

    constructor(bytes32 _password) {
        password = _password;
    }

    modifier checkPassword(bytes32 _password) {
        require(password == _password, "Wrong Password");
        _;
    }

    function deposit() external payable onlyOwner {}

    function withdraw(bytes32 _password) external checkPassword(_password) {
        payable(msg.sender).transfer(address(this).balance);
    }
}
