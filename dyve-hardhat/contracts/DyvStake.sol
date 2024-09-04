// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;


// import "@synthetixio/contracts/Synthetix.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DyvStake {
  address public owner;
  uint256 public durationOfStake;
  address public usdtStakedAddress;

  struct Stakers {
    uint256 amountStaked;
    uint256 dateStaked;
    uint256 rewardEarned;
    uint256 isRewardCollected;
  }

  mapping(address => Stakers[]) stakingPool;

  constructor(address _stakedTokenAddress) {
    owner = msg.sender;
    usdtStakedAddress = _stakedTokenAddress;
  }

  error YouCantTransactWithAddressZero();
  error YouCantStakeAtDeadline();
  error TheAmountIsLessThanTheRequire();
  error OnlyOwnerCanUseThis();

  event stakingSuccessful(address userAddress, uint256 amountStaked);

  function addToStakingPool(uint26 _amount) external {
    if(msg.sender == address(0)) {
      revert YouCantTransactWithAddressZero();
    }

    if(msg.sender != owner) {
      revert OnlyOwnerCanUseThis();
    }

    payable(owner).transfer(owner);
  }
  function stakeStableCoin(uint duration) external payable {
    if(msg.sender == address(0)){
      revert YouCantTransactWithAddressZero();
    }
    if(duration >= durationOfStake) {
      revert YouCantStakeAtDeadline();
    }
    if(msg.value < 20) {
      revert TheAmountIsLessThanTheRequire();
    }

    // mbool status = address(this).transfer(msg.value);
    IERC20(usdtStakedAddress).transferFrom(msg.sender, address(this), _amount);

    if(!status) {
      revert TransactionFailed();
    }

    stakingPool[msg.sender].amountStaked = msg.value;
    stakingPool[msg.sender].dateStaked = block.timestamp;
    stakingPool[msg.sender].rewardEarned = 0;
    stakingPool[msg.sender].isRewardCollected = false;
    
    emit stakingSuccessful(msg.sender, msg.value); 
  }

  function withdrawReward()
}