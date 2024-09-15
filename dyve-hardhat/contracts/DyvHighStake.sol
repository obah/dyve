// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MicroLoan.sol";

contract DyvHighStake {
    address public owner;
    uint256 public durationOfStake;
    address public usdtStakedAddress;
    uint256 public weeklyStakeFund;

    // MicroLoan public microLoanContractAddress;

    struct Stakers {
        uint256 amountStaked;
        uint256 timeStaked;
        uint256 rewardEarned;
        uint256 totalAmount;
        bool isRewardCollected;
        bool stakeDeposited;
    }

    mapping(address => Stakers[]) public stakingPool;

    constructor(address _stakedTokenAddress) {
        owner = msg.sender;
        usdtStakedAddress = _stakedTokenAddress;
        // microLoanContractAddress = MicroLoan(_microLoanContractAddress);
    }

    error YouCantStakeAtDeadline();
    error TheAmountIsLessThanTheRequire();
    error ThisUserDoesNotExist();
    error MinimumOf7daysStakeIsRequired();
    error AddressZeroDetected();
    error ThisUserDoesNotHaveThisAmount();
    error YouAreNotAllowedToCallThisFunction();

    event WithdrawalSuccessful(address indexed user, uint256 rewardGiven);
    event StakingSuccessful(address userAddress, uint256 amountStaked);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can use this");
        _;
    }

    modifier noAddressZero() {
        require(msg.sender != address(0), "Address Zero Not Allowed at Dyve");
        _;
    }

    function addToStakingPool(uint256 _amount) external onlyOwner {
        weeklyStakeFund += _amount;
    }

    function stakeHighStableCoin(uint256 amountToStake) external noAddressZero {
        if (amountToStake < 20 * 10 ** 18) {
            revert TheAmountIsLessThanTheRequire();
        }
        IERC20(usdtStakedAddress).transferFrom(msg.sender, address(this), amountToStake);

        uint256 _totalAmount = 0;
        if (stakingPool[msg.sender].length > 0) {
            for (uint256 i = 0; i < stakingPool[msg.sender].length; i++) {
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

        emit StakingSuccessful(msg.sender, amountToStake);
    }

    function calculateReward(uint256 amountStaked, uint256 timeStaked) internal view returns (uint256) {
        uint256 timeStakedInSeconds = block.timestamp - timeStaked;
        if (timeStakedInSeconds < 7 days) {
            revert MinimumOf7daysStakeIsRequired();
        }
        uint256 weeksStaked = timeStakedInSeconds / 1 weeks;
        uint256 totalStakedInContract = IERC20(usdtStakedAddress).balanceOf(address(this));
        require(totalStakedInContract > 0, "No tokens to distribute");
        uint256 userShareOfStake = (amountStaked * 1e18) / totalStakedInContract;
        uint256 reward = (userShareOfStake * weeklyStakeFund * weeksStaked) / 1e18;
        return reward;
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
                emit WithdrawalSuccessful(user, reward);
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

    function reduceStakingAmount(address user, uint256 amount) internal {
        for (uint256 i = 0; i < stakingPool[user].length; i++) {
            if (stakingPool[user][i].amountStaked >= amount) {
                stakingPool[user][i].amountStaked -= amount;
                if (stakingPool[user][i].amountStaked == 0) {
                    removeStake(user, i);
                }
                break;
            }
        }
    }
}
