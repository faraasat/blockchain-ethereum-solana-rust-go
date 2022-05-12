// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./SafeMath.sol";

contract Token is ERC20 {
    using SafeMath for uint256;
    uint256 BURN_TAX = 5;
    uint256 ADMIN_TAX = 5;
    uint256 CHARITY_TAX = 5;
    address public admin;
    address public charity;
    mapping(address => bool) public excludedFromTax;

    constructor() ERC20("TOKEN", "TKN") {
        _mint(msg.sender, 1000000 * 10**18);
        admin = msg.sender;
        excludedFromTax[msg.sender] = true;
    }

    function transfer(address recipient, uint256 amount)
        public
        override
        returns (bool)
    {
        if (excludedFromTax[msg.sender] == true) {
            _transfer(_msgSender(), recipient, amount);
        } else {
            uint256 burnAmount = amount.mul(BURN_TAX) / 100;
            uint256 adminAmount = amount.mul(ADMIN_TAX) / 100;
            uint256 charityAmount = amount.mul(CHARITY_TAX) / 100;
            _burn(_msgSender(), burnAmount);
            _transfer(_msgSender(), admin, adminAmount);
            _transfer(_msgSender(), charity, charityAmount);
            uint256 recipientAmount = amount
                .sub(burnAmount)
                .sub(adminAmount)
                .sub(charityAmount);
            _transfer(_msgSender(), recipient, recipientAmount);
        }
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        if (excludedFromTax[sender] == true) {
            _transfer(sender, recipient, amount);
            _approve(
                sender,
                _msgSender(),
                allowance(sender, _msgSender()).sub(
                    amount,
                    "ERC20: transfer amount exceeds allowance"
                )
            );
        } else {
            uint256 burnAmount = amount.mul(BURN_TAX) / 100;
            uint256 adminAmount = amount.mul(ADMIN_TAX) / 100;
            uint256 charityAmount = amount.mul(CHARITY_TAX) / 100;
            _burn(sender, burnAmount);
            _transfer(sender, admin, adminAmount);
            _transfer(sender, charity, charityAmount);
            uint256 recipientAmount = amount
                .sub(burnAmount)
                .sub(adminAmount)
                .sub(charityAmount);
            _transfer(sender, recipient, recipientAmount);
            _approve(
                sender,
                _msgSender(),
                allowance(sender, _msgSender()).sub(recipientAmount)
            );
        }
        return true;
    }

    function addExcludedFromTax(address excluded) external {
        require(msg.sender == admin, "only admin");
        excludedFromTax[excluded] = true;
    }

    function updateCharity(address _charity) external {
        require(msg.sender == admin, "only admin");
        charity = _charity;
    }
}
