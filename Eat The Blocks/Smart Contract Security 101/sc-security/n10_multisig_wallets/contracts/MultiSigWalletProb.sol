//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/utils/Address.sol";

contract MultiSigWalletProb {
    using Address for address payable;

    address[2] public admins;

    struct Signature {
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    constructor(address[2] memory _admins) {
        admins = _admins;
    }

    function transfer(
        address to,
        uint256 amount,
        Signature[2] memory signatures
    ) external {
        require(
            _verifySignature(to, amount, signatures[0]) == admins[0],
            "Access Restricted"
        );
        require(
            _verifySignature(to, amount, signatures[1]) == admins[1],
            "Access Restricted"
        );

        payable(to).sendValue(amount);
    }

    function _verifySignature(
        address to,
        uint256 amount,
        Signature memory signature
    ) internal pure returns (address signer) {
        // 52 = message byte length
        string memory header = "\x19Ethereum Signed Message:\n52";
        bytes32 messageHash = keccak256(abi.encodePacked(header, to, amount));

        // Perform the elliptic curve recover operation
        return ecrecover(messageHash, signature.v, signature.r, signature.s);
    }

    receive() external payable {}
}
