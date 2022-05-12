//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/utils/Address.sol";

contract MultiSigWalletSol {
    using Address for address payable;

    address[2] public admins;

    mapping(bytes32 => bool) public executed;

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
        Signature[2] memory signatures,
        uint256 nonce
    ) external {
        bytes32 firstSig = keccak256(
            abi.encodePacked(
                nonce,
                signatures[0].v,
                signatures[0].r,
                signatures[0].s
            )
        );
        bytes32 secondSig = keccak256(
            abi.encodePacked(
                nonce,
                signatures[0].v,
                signatures[0].r,
                signatures[0].s
            )
        );
        require(
            !executed[firstSig] && !executed[secondSig],
            "Signature expired"
        );
        executed[firstSig] = true;
        executed[secondSig] = true;

        bool signatureChecked = false;
        if (
            _verifySignature(to, amount, signatures[0]) == admins[0] &&
            _verifySignature(to, amount, signatures[1]) == admins[1]
        ) {
            signatureChecked = true;
        }
        require(signatureChecked, "Access Restricted");

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
