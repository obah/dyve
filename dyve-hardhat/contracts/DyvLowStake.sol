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
    MicroLoan public microLoanContractAddress;
    
    constructor(address _tokenAddress) {
        if (_tokenAddress == address(0)) {
            revert YouCantTransactWithAddressZero();
        }

        owner = msg.sender;
        tokenAddress = _tokenAddress;
        // microLoanContractAddress = MicroLoan(_microLoanContractAddress);
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
    
    function depositIntoMicroLoan(uint256 amount, address fromThisUser) external {
        if (fromThisUser == address(0)) {
            revert AddressZeroDetected();
        }
        if (msg.sender != address(microLoanContractAddress)) {
            revert YouAreNotAllowedToCallThisFunction();
        }
        if (usersStakes[fromThisUser].length == 0) {
            revert ThisUserDoesNotExist();
        }
        uint256 totalAmountStaked = 0;
        for (uint256 i = 0; i < usersStakes[fromThisUser].length; i++) {
            totalAmountStaked += usersStakes[fromThisUser][i].amountStaked;
        }
        if (amount > totalAmountStaked) {
            revert ThisUserDoesNotHaveThisAmount();
        }
        IERC20 token = IERC20(tokenAddress);
        require(
            token.transferFrom(fromThisUser, address(microLoanContractAddress), amount),
            "Transfer to Savings failed"
        );
        // This Needs to be implemented in the MicroLoan
        microLoanContractAddress.depositFromSavings(amount);
        reduceStakingAmount(fromThisUser, amount);
    }
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





// pragma solidity ^0.8.24;


// // import "@synthetixio/contracts/Synthetix.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// contract DyvLowStake {

//   error YouCantTransactWithAddressZero();
//   error YouCantStakeInZeroAmount();
//   error YouHaventEarnedThisRewardYet();

//   address owner;

//   address tokenAddress;

//   uint256 public durationOfStake;
//   uint256 weeklyStakeFund;

//   constructor(address _tokenAddress) {
//     if(_tokenAddress == address(0)) {
//       revert YouCantTransactWithAddressZero();
//     }

//     owner = msg.sender;  
//     tokenAddress = _tokenAddress;
//   }

//   struct Stakers {
//     uint256 amountStaked;
//     uint256 timeStaked;
//     uint256 rewardEarned;
//     uint256 totalAmount;
//     bool isRewardCollected;
//     bool hasStakeBeenDeposited;
//   }

//   mapping(address => Stakers[]) usersStakes;

//   event stakingSuccessful(address indexed user, uint256 amount);


//   function stakeLowStableCoin(uint256 _amount) public {
//     if(msg.sender == address(0)) {
//       revert YouCantTransactWithAddressZero();
//     }
//     if(_amount == 0) {
//       revert YouCantStakeInZeroAmount();
//     }

//       IERC20(tokenAddress).transferFrom(msg.sender, address(this), _amount);

//       uint256 _total = 0;

//       if(usersStakes[msg.sender].length > 0) {
//         for(uint256 i = 0; i < usersStakes[msg.sender].length; i++) {
//           _total += usersStakes[msg.sender][i].amountStaked;
//           _total += usersStakes[msg.sender][i].rewardEarned;
//         }
//       }

//       Stakers memory newStakers = Stakers({
//         amountStaked: _amount,
//         timeStaked: block.timestamp,
//         rewardEarned: 0,
//         totalAmount: _total,
//         isRewardCollected: false,
//         hasStakeBeenDeposited: true
//       });

//       usersStakes[msg.sender].push(newStakers);

//       emit stakingSuccessful(msg.sender, _amount);
//   }

//   function calculateReward(uint256 amountStaked) private view returns(uint256) {
//     uint256 noOfDaysStaked = block.timestamp;
//     if(usersStakes[msg.sender].length > 0){
//       for(uint256 i = 0; i < usersStakes[msg.sender].length; i++){
//         if(amountStaked > usersStakes[msg.sender][i].amountStaked){
//           revert YouHaventEarnedThisRewardYet();
//         }
//         noOfDaysStaked -= usersStakes[msg.sender][i].timeStaked;
//       }
//     } else {
//       noOfDaysStaked -= usersStakes[msg.sender][0].timeStaked;
//     }
//     uint256 SCALING_FACTOR = 10 ** 2;
//     uint256 timeInsecs = noOfDaysStaked * 24 * 60 * 60;
//     uint expectedROI = (amountStaked * timeInsecs) / SCALING_FACTOR;

//     return expectedROI;
//   }

//   function withdrawYield(uint256 amount) external returns(uint256){
//     if(msg.sender != address(0)) {
//       revert YouCantTransactWithAddressZero();
//     }
//     uint256 roi = 0;
//     if(usersStakes[msg.sender].length > 0){
      
//       for(uint256 i = 0; i < usersStakes[msg.sender].length; i++){
//         if(amount > usersStakes[msg.sender][i].rewardEarned) {
//           revert YouHaventEarnedThisRewardYet();
//         }
//         else{
//           roi += calculateReward(usersStakes[msg.sender][i].amountStaked);
//           usersStakes[msg.sender][i].rewardEarned -= roi;
//         }
//       }
//     }
//     else{
//       if(amount > usersStakes[msg.sender][0].rewardEarned) {
//           revert YouHaventEarnedThisRewardYet();
//         }
//         else{
//           roi += calculateReward(usersStakes[msg.sender][0].amountStaked);
//           usersStakes[msg.sender][0].rewardEarned -= roi;
//         }
//     }
//     IERC20(tokenAddress).transfer(msg.sender, amount);
//     return roi;
    
//   }

//   // function depositIntoMicroLoan(uint256 amount) external {

//   // }
// }