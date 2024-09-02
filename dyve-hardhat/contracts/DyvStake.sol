// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract DyvStake {
  address owner;

  address durationOfStake;

  address usdtStakedAddress;

  struct Stakers {
    uint256 amountStaked;
    uint256 dateStaked;
    uint256 rewardEarned;
    uint256 isRewardCollected;
  }

  mapping(address => Stakers) stakingPool;

  constructor(address _stakedTokenAddress) {
    owner = msg.sender;
    usdtStakedAddress = _stakedTokenAddress;
  }

  error YouCantTransactWithAddressZero();
  error YouCantStakeAtDeadline();

  function stakeStableCoin(uint duration) external payable {
    if(msg.sender == address(0)){
      revert YouCantTransactWithAddressZero();
    }
    if(duration >= durationOfStake) {
      revert YouCantStakeAtDeadline();
    }
  }
}