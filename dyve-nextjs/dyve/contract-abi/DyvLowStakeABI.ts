export const DyvLowStakesABI =[
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_tokenAddress",
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
        "name": "YouCantStakeInZeroAmount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "YouCantTransactWithAddressZero",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "YouHaventEarnedThisRewardYet",
        "type": "error"
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
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "StakingSuccessful",
        "type": "event"
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
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "stakeLowStableCoin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenAddress",
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
        "name": "usersStakes",
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
                "name": "hasStakeBeenDeposited",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawYield",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]