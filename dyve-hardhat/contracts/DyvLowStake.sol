// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MicroLoan.sol";

contract DyvLowStake {

    error YouCantTransactWithAddressZero();
    error YouCantStakeInZeroAmount();
    error YouHaventEarnedThisRewardYet();
    error AddressZeroDetected();
    error YouAreNotAllowedToCallThisFunction();
    error ThisUserDoesNotExist();
    error ThisUserDoesNotHaveThisAmount();

    address public owner;
    address public tokenAddress;
    
    constructor(address _tokenAddress) {
        if (_tokenAddress == address(0)) {
            revert YouCantTransactWithAddressZero();
        }

        owner = msg.sender;
        tokenAddress = _tokenAddress;
    }

    struct Staker {
        uint256 amountStaked;
        uint256 timeStaked;
        uint256 rewardEarned;
        uint256 totalAmount; 
        bool isRewardCollected;
        bool hasStakeBeenDeposited;
    }

    mapping(address => Staker[]) public usersStakes;

    event StakingSuccessful(address indexed user, uint256 amount);
    
    function removeStake(address user, uint256 index) internal {
        uint256 lastIndex = usersStakes[user].length - 1;
        if (index != lastIndex) {
            usersStakes[user][index] = usersStakes[user][lastIndex];
        }
        usersStakes[user].pop();
    }
    function reduceStakingAmount(address user, uint256 amount) internal {
        for (uint256 i = 0; i < usersStakes[user].length; i++) {
            if (usersStakes[user][i].amountStaked >= amount) {
                usersStakes[user][i].amountStaked -= amount;
                if (usersStakes[user][i].amountStaked == 0) {
                    removeStake(user, i);
                }
                break;
            }
        }
    }
    function stakeLowStableCoin(uint256 _amount) public {
        if (_amount == 0) {
            revert YouCantStakeInZeroAmount();
        }

        IERC20(tokenAddress).transferFrom(msg.sender, address(this), _amount);

        uint256 _total = _amount;

        if (usersStakes[msg.sender].length > 0) {
            for (uint256 i = 0; i < usersStakes[msg.sender].length; i++) {
                _total += usersStakes[msg.sender][i].rewardEarned; 
            }
        }

        Staker memory newStaker = Staker({
            amountStaked: _amount,
            timeStaked: block.timestamp,
            rewardEarned: 0,
            totalAmount: _total, 
            isRewardCollected: false,
            hasStakeBeenDeposited: true
        });

        usersStakes[msg.sender].push(newStaker);

        emit StakingSuccessful(msg.sender, _amount);
    }

    function calculateReward(uint256 amountStaked) private view returns (uint256) {
        uint256 totalReward = 0;

        for (uint256 i = 0; i < usersStakes[msg.sender].length; i++) {
            if (amountStaked > usersStakes[msg.sender][i].amountStaked) {
                revert YouHaventEarnedThisRewardYet();
            }

            uint256 stakingDuration = block.timestamp - usersStakes[msg.sender][i].timeStaked;
            uint256 SCALING_FACTOR = 10 ** 2;
            uint256 timeInDays = stakingDuration / (24 * 60 * 60); 

            uint256 expectedROI = (amountStaked * timeInDays) / SCALING_FACTOR;

            totalReward += expectedROI;
        }

        return totalReward;
    }

    function withdrawYield(uint256 amount) external returns (uint256) {
        uint256 totalAvailable = 0;
        uint256 roi = 0;

        for (uint256 i = 0; i < usersStakes[msg.sender].length; i++) {
            roi = calculateReward(usersStakes[msg.sender][i].amountStaked); 
            totalAvailable += usersStakes[msg.sender][i].rewardEarned; 

            if (totalAvailable >= amount) {
                usersStakes[msg.sender][i].rewardEarned -= amount; 
                IERC20(tokenAddress).transfer(msg.sender, amount); 
                return amount;
            }
        }

        revert YouHaventEarnedThisRewardYet();
    }
}

