export const DyvHighStakeABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_stakedTokenAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "AddressZeroDetected",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "MinimumOf7daysStakeIsRequired",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TheAmountIsLessThanTheRequire",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ThisUserDoesNotExist",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ThisUserDoesNotHaveThisAmount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "YouAreNotAllowedToCallThisFunction",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "YouCantStakeAtDeadline",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountStaked",
                "type": "uint256"
            }
        ],
        "name": "StakingSuccessful",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardGiven",
                "type": "uint256"
            }
        ],
        "name": "WithdrawalSuccessful",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "addToStakingPool",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "durationOfStake",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountToStake",
                "type": "uint256"
            }
        ],
        "name": "stakeHighStableCoin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "stakingPool",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountStaked",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timeStaked",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rewardEarned",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalAmount",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isRewardCollected",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "stakeDeposited",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "usdtStakedAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "weeklyStakeFund",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]