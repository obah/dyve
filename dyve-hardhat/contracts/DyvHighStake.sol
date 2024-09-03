// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;


// import "@synthetixio/contracts/Synthetix.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DyvHighStake {
  address public owner;
  uint256 public durationOfStake;
  address public usdtStakedAddress;

  uint256 weeklyStakeFund;

  struct Stakers {
    uint256 amountStaked;
    uint256 timeStaked;
    uint256 rewardEarned;
    uint256 totalAmount;
    bool isRewardCollected;
    bool stakeDeposited;
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
  error ThisUserDoesNotExist();
  error MinimumOf7daysStakeIsRequired();

  event withdrawalSuccesful(address indexed user, uint256 rewardGiven);

  event stakingSuccessful(address userAddress, uint256 amountStaked);

  function addToStakingPool(uint256 _amount) external {
    if(msg.sender == address(0)) {
      revert YouCantTransactWithAddressZero();
    }

    if(msg.sender != owner) {
      revert OnlyOwnerCanUseThis();
    }

    weeklyStakeFund += _amount;

  }
  function stakeHighStableCoin(uint256 amountToStake) external {
    if(msg.sender == address(0)){
      revert YouCantTransactWithAddressZero();
    }
    // if(duration >= durationOfStake) {
    //   revert YouCantStakeAtDeadline();
    // }
    if(amountToStake < 20 * 10 ** 18) {
      revert TheAmountIsLessThanTheRequire();
    }
    
    IERC20(usdtStakedAddress).transferFrom(msg.sender, address(this), amountToStake);

    uint _totalAmount = 0;
    if(stakingPool[msg.sender].length > 0){
      for(uint256 i = 0; i <stakingPool[msg.sender].length; i++) {
        _totalAmount += stakingPool[msg.sender][i].amountStaked;
        _totalAmount += stakingPool[msg.sender][i].rewardEarned;
      }
    }

    Stakers memory newStaker = Stakers({
            amountStaked: amountToStake,
            timeStaked: block.timestamp,
            rewardEarned: 0,
            totalAmount: _totalAmount,
            isRewardCollected: false,
            stakeDeposited: true
    });
    
   

    stakingPool[msg.sender].push(newStaker);
    
    emit stakingSuccessful(msg.sender, amountToStake); 
  }

  function updateUserDashboard(Stakers memory stakers) external {
    

  }


  function calculateReward(uint amountStaked, uint256 timeStaked) internal view returns(uint256) {
    if(msg.sender != address(0)) {
      revert YouCantTransactWithAddressZero();
    }
    if(amountStaked > 20 * 10 ** 2){
      revert TheAmountIsLessThanTheRequire();
    }
    uint256 timeStakedInSeconds = block.timestamp - timeStaked;
    uint256 daysStaked = timeStakedInSeconds / 84600;
    if(daysStaked < 7) {
      revert MinimumOf7daysStakeIsRequired();
    }
    
    uint256 shareOfUser = amountStaked/address(this).balance;
    uint256 share = shareOfUser / weeklyStakeFund;
    share = share * 7;

   return share;
  }

  function withdrawReward(address user, uint256 amount) external {
        bool userExists = false;

        for (uint256 i = 0; i < stakingPool[user].length; i++) {
            if (stakingPool[user][i].amountStaked >= amount) {
                userExists = true;
                uint256 reward = calculateReward(stakingPool[user][i].amountStaked, stakingPool[user][i].timeStaked);
                stakingPool[user][i].rewardEarned = reward;
                IERC20(usdtStakedAddress).transfer(user, reward);

                stakingPool[user][i].amountStaked -= amount;

                if (stakingPool[user][i].amountStaked == 0) {
                    removeStake(user, i);
                }

                emit withdrawalSuccesful(user, reward);
                break;
            }
        }

        if (!userExists) {
            revert ThisUserDoesNotExist();
        }
    }


    function removeStake(address user, uint256 index) internal {
        uint256 lastIndex = stakingPool[user].length - 1;

        if (index != lastIndex) {
            stakingPool[user][index] = stakingPool[user][lastIndex];
        }

        stakingPool[user].pop();
    }
}




  // EXTRACT FROM STAKE STABLECOIN
  // mbool status = address(this).transfer(msg.value);
  // if(!status) {
    //   revert TransactionFailed();
    // }

    // stakingPool[msg.sender].amountStaked = amountToStake;
    // stakingPool[msg.sender].dateStaked = block.timestamp;
    // stakingPool[msg.sender].rewardEarned = 0;
    // stakingPool[msg.sender].isRewardCollected = false;