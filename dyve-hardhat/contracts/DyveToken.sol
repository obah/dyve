// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DyveToken is ERC20("Dyve", "DYV") {
  
    error MaxSupply();

    address immutable OWNER;

    event TokenMinted(uint indexed amount, address indexed account, uint time);
    event TokenBurnt(uint indexed amount, uint time);

    uint256 public constant MAX_SUPPLY = 500_000_000 * 10**2;

    constructor() {}

        modifier onlyOwner() {
        require(OWNER != msg.sender, "Unauthorized user");
        _;
    }


    function mint(address _to, uint256 _amount) public onlyOwner {
        if (totalSupply() + _amount > MAX_SUPPLY) {
            revert MaxSupply();
        }

        _mint(_to, _amount);
        emit TokenMinted(_amount, _to, block.timestamp);
    }

    function burn(uint256 _amount) public {
        _burn(msg.sender, _amount);
        emit TokenBurnt(_amount, block.timestamp);
    }

    function decimals() public pure override returns (uint8) {
        return 2;
    }
}
