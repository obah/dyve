// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUsdt is ERC20("DyveUSDT", "dUSDT") {
   constructor() {
        _mint(msg.sender, 100000000);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    function decimals() public pure override returns ( uint8 ) {
       return 2;
    }
}