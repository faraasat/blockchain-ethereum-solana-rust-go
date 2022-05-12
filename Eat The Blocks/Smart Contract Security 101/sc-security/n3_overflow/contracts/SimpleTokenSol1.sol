//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "./OwnableSol.sol";

contract SimpleTokenSol1 is Ownable {
    mapping(address => uint256) public balanceOf;
    uint256 public totalSupply;

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
    }

    function transfer(address _to, uint256 _amount) public {
        // this require line isn't performing any check because they are uint but on underflow result will be signed
        require(balanceOf[msg.sender] - _amount >= 0, "Not Enough Tokens");
        balanceOf[msg.sender] -= _amount;
        balanceOf[_to] += _amount;
    }

    function mint(uint256 amount) external {
        totalSupply += amount;
        balanceOf[owner()] += amount;
    }
}
