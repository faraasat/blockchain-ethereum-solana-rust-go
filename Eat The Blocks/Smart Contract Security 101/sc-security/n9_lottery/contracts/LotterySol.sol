//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract LotterySol is VRFConsumerBase, Ownable {
    using Address for address payable;

    mapping(address => uint8) public bets;
    bool public betsClosed;
    bool public prizeTaken;

    bytes32 internal keyHash;
    uint256 internal fee;

    uint256 public randomResult;
    uint8 public winningNumber;

    constructor()
        VRFConsumerBase(
            0x6168499c0cFfCaCD319c818142124B7A15E857ab, // VRF Coordinator
            0x01BE23585060835E02B77ef475b0Cc51aA1e0709 // Link Token
        )
    {
        keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;
        fee = 0.1 * 10**18; // 0.1 LINK (varies by Network)
    }

    function getRandomNumber() public returns (bytes32 requestId) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness)
        internal
        override
    {
        randomResult = randomness;
    }

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
        winningNumber = uint8((randomResult % 254) + 1);
    }

    function withdrawPrize() external {
        require(betsClosed == true, "Bets are still open");
        require(prizeTaken == false, "Prize is already taken");
        require(bets[msg.sender] == winningNumber, "You aren't the winner");
        prizeTaken = true;
        payable(msg.sender).sendValue(address(this).balance);
    }
}
