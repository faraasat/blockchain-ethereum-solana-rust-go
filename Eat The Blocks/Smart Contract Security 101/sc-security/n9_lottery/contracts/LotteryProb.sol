//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LotteryProb is Ownable {
    using Address for address payable;

    uint8 public winningNumber;
    mapping(address => uint8) public bets;
    bool public betsClosed;
    bool public prizeTaken;

    function placeBet(uint8 _number) external payable {
        require(bets[msg.sender] == 0, "Only 1 bet per player");
        require(msg.value == 10 ether, "Bets cost: 10 ether");
        require(betsClosed == false, "Bets are closed");
        require(
            _number > 0 && _number <= 255,
            "Must be a number from 1 to 255"
        );
        bets[msg.sender] = _number;
    }

    function endLottery() external onlyOwner {
        betsClosed = true;
        winningNumber = pseudoRandNumGen();
    }

    function withdrawPrize() external {
        require(betsClosed == true, "Bets are still open");
        require(prizeTaken == false, "Prize is already taken");
        require(bets[msg.sender] == winningNumber, "You aren't the winner");
        prizeTaken = true;
        payable(msg.sender).sendValue(address(this).balance);
    }

    function pseudoRandNumGen() private view returns (uint8) {
        return
            (uint8(uint256(keccak256(abi.encode(block.timestamp)))) % 254) + 1;
    }
}
