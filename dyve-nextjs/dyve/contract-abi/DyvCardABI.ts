export const DyvCardABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "OnlyOwner",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "certificationName",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "dyvId",
                "type": "uint256"
            }
        ],
        "name": "DyvCardCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_student",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_certId",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_certName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_certDate",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_ownerName",
                "type": "string"
            }
        ],
        "name": "addCard",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "dyvIds",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_student",
                "type": "address"
            }
        ],
        "name": "fetchCard",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "dyvId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "dateCreated",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "certificationId",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "certificationName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "certificationDate",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "ownerName",
                        "type": "string"
                    }
                ],
                "internalType": "struct DyvCard.CertificationCard[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]