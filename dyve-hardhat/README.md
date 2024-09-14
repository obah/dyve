# Dyve - The Blockchain Gateway to Financial Inclusion and Financial Literacy

![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)
![GitHub issues](https://img.shields.io/github/issues/Olanetsoft/awesome-hackathon-projects?style=plastic)
![GitHub forks](https://img.shields.io/github/forks/Olanetsoft/awesome-hackathon-projects?style=plastic)
![GitHub stars](https://img.shields.io/github/stars/Olanetsoft/awesome-hackathon-projects?style=plastic)
![GitHub watchers](https://img.shields.io/github/watchers/Olanetsoft/awesome-hackathon-projects?style=plastic&label=Watch)

---

## Table of Contents

- [Dyve - The Blockchain Gateway to Financial Inclusion and Financial Literacy](#dyve---the-blockchain-gateway-to-financial-inclusion-and-financial-literacy)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Meet the Developers](#meet-the-developers)
  - [Smart Contracts](#smart-contracts)
    - [DyveToken](#dyvetoken)
      - [Key Features](#key-features)
      - [Contract Code](#contract-code)
    - [MicroLoan](#microloan)
      - [Key Features](#key-features-1)
    - [MockUsdt](#mockusdt)
      - [Key Features](#key-features-2)
      - [Contract Code](#contract-code-1)
  - [Deployment Addresses](#deployment-addresses)
  - [Features](#features)
    - [Dyve Learning Platform](#dyve-learning-platform)
      - [Key Components](#key-components)
    - [Dyve Savings Platform](#dyve-savings-platform)
      - [Key Components](#key-components-1)
    - [Dyve MicroLoan Platform](#dyve-microloan-platform)
      - [Key Components](#key-components-2)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

---

## Introduction

Welcome to **Dyve**!

At **Dyve**, we recognize that financial inclusion remains a pressing challenge in today's world. Many individuals, particularly in underserved and developing regions, face significant barriers to accessing essential financial services. These barriers include limited access to traditional banking, high transaction costs, lack of financial literacy, and inadequate opportunities for savings and credit.

Our innovative blockchain-based ecosystem is designed specifically to address these issues head-on. We offer a suite of services aimed at enhancing financial inclusion and literacy:

1. **Dyve Learning Platform**
2. **Dyve Savings Platform**
3. **Dyve MicroLoan Platform**

---

## Meet the Developers

[![Twitter Follow](https://img.shields.io/twitter/follow/jeremiahDSamuel?style=social)](https://twitter.com/jeremiahDSamuel)
[![GitHub Follow](https://img.shields.io/github/followers/jeremiahDSamuel?label=Follow&style=social)](https://github.com/jeremiahDSamuel)

[![Twitter Follow](https://img.shields.io/twitter/follow/Oba_Ddev?style=social)](https://twitter.com/Oba_Ddev)
[![GitHub Follow](https://img.shields.io/github/followers/Oba-Ddev?label=Follow&style=social)](https://github.com/Oba-Ddev)

[![Twitter Follow](https://img.shields.io/twitter/follow/web3papi_?style=social)](https://twitter.com/web3papi_)
[![GitHub Follow](https://img.shields.io/github/followers/web3papi?label=Follow&style=social)](https://github.com/web3papi)

[![Twitter Follow](https://img.shields.io/twitter/follow/shegspear17?style=social)](https://twitter.com/shegspear17)
[![GitHub Follow](https://img.shields.io/github/followers/shegspear17?label=Follow&style=social)](https://github.com/shegspear17)

---

## Smart Contracts

Our platform utilizes several smart contracts to facilitate its services. Below is an overview of each contract and its functionality.

### DyveToken

The `DyveToken` contract is an ERC20 token implementation representing the native token of the Dyve platform, called **DYV**.

- **Symbol**: DYV
- **Decimals**: 2
- **Max Supply**: 500,000,000 DYV

#### Key Features

- **Minting**: Allows the owner to mint new tokens up to the maximum supply.
- **Burning**: Enables users to burn their tokens, reducing the total supply.
- **Events**:
  - `TokenMinted`: Emitted when tokens are minted.
  - `TokenBurnt`: Emitted when tokens are burned.

#### Contract Code

```solidity
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DyveToken is ERC20("Dyve", "DYV") {
    error MaxSupply();

    event TokenMinted(uint indexed amount, address indexed account, uint time);
    event TokenBurnt(uint indexed amount, uint time);

    address immutable OWNER;
    uint256 public constant MAX_SUPPLY = 500_000_000 * 10**2;

    constructor() {
        OWNER = msg.sender;
    }

    function mint(address _to, uint256 _amount) public {
        if(totalSupply() + _amount >= MAX_SUPPLY) {
            revert MaxSupply();
        }
        _mint(_to, _amount);
        emit TokenMinted(_amount, _to, block.timestamp);
    }

    function burn(uint40 _amount) public {
        _burn(msg.sender, _amount);
        emit TokenBurnt(_amount, block.timestamp);
    }

    function decimals() public pure override returns (uint8) {
        return 2;
    }
}
```

---

### MicroLoan

The `MicroLoan` contract facilitates microloan services within the Dyve ecosystem.

#### Key Features

- **Loan Provision**: Allows users to supply funds to the loan pool and earn yield.
- **Borrowing**: Users can borrow funds by depositing collateral.
- **Repayment**: Borrowers can repay loans, and if defaulted, collateral is liquidated.
- **Interest Rates**: The owner can set the borrowers' interest rate and providers' yield rate.
- **Events**: Various events for deposit, loan supply, borrowing, repayment, liquidation, etc.


---

### MockUsdt

The `MockUsdt` contract is a mock implementation of the USDT token, used for testing purposes within the Dyve platform.

- **Symbol**: dUSDT
- **Decimals**: 2

#### Key Features

- **Minting**: Allows minting of mock USDT tokens.
- **Burning**: Enables burning of mock USDT tokens.

#### Contract Code

```solidity
// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUsdt is ERC20("DyveUSDT", "dUSDT") {
    constructor() {
        _mint(msg.sender, 100000000);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    function decimals() public pure override returns (uint8) {
        return 2;
    }
}
```

---

## Deployment Addresses

The smart contracts have been deployed on the **Lisk Mainnet** and **Lisk Testnet**. Please find the deployment addresses below:

- **DyveToken**:
  - Mainnet: [[0x223b2DdbF57493ED5B0bC5FeB8d6660fbB698f0C](https://blockscout.lisk.com/address/0x223b2DdbF57493ED5B0bC5FeB8d6660fbB698f0C#code)](#)
  - Testnet: [[0xa376A2Fc019402AaDf31A2Ff35DC7076f7bD6e54](https://sepolia-blockscout.lisk.com/address/0xa376A2Fc019402AaDf31A2Ff35DC7076f7bD6e54)](#)
  - 
- **MicroLoan**:
  - Mainnet: [https://blockscout.lisk.com/address/0xC7D3CBF0DAcd588269A887bC14A6339221B8b20a#code](#)
  - Testnet: [[0x6A453261147298C063AF40c618B0d86a36b8EC17](https://sepolia-blockscout.lisk.com/address/0x6A453261147298C063AF40c618B0d86a36b8EC17)](#)
  - 
- **DYVSave**:
  - Mainnet: [[0xb2F2A39fB5e334f78C3Ea76E0A53e5C3c8C12542](https://blockscout.lisk.com/address/0xb2F2A39fB5e334f78C3Ea76E0A53e5C3c8C12542#code)](#)
  - Testnet: [[0xe06d39562bB02Aa92a3c55495Ef3dFb27f679f83](https://sepolia-blockscout.lisk.com/address/0xe06d39562bB02Aa92a3c55495Ef3dFb27f679f83)](#)
  - 
- **MockUsdt**:
  - Mainnet: [[0x2913ba4D9d925BC05006F529eEcb96D0BAd9C6D3](https://blockscout.lisk.com/address/0x2913ba4D9d925BC05006F529eEcb96D0BAd9C6D3#code)](#)
  - Testnet: [ [0xb4EDe51F8AE62D14A18b9609e3EF12d1B6542e13](https://sepolia-blockscout.lisk.com/address/0xb4EDe51F8AE62D14A18b9609e3EF12d1B6542e13)](#)
  - 
- **Academy**:
  - Mainnet: [[0x2D6524f95c9Be9Aa9FdD89f860D93165F92C23B0](https://blockscout.lisk.com/address/0x2D6524f95c9Be9Aa9FdD89f860D93165F92C23B0#code)](#)
  - Testnet: [[0x1bF3c9E916a56a7bD22ef9ccd7343Cf8C1Ac039c](https://sepolia-blockscout.lisk.com/address/0x1bF3c9E916a56a7bD22ef9ccd7343Cf8C1Ac039c)](#)

---

## Features

### Dyve Learning Platform

![Learning Platform](https://i.imgur.com/qtFzpMT.png)

The **Dyve Learning Platform** is designed to provide high-quality education on blockchain technology and financial investments.

#### Key Components

- **Curated Educational Content**:
  - Courses on web3 technology and financial investments.
  - Multilingual support for diverse audiences.

- **Progress Tracking and Certification**:
  - Smart contract integration for tracking progress.
  - Soulbound Tokens (SBTs) as certifications.
  - Learn-and-Earn model rewarding users with DYV tokens.

- **User Experience**:
  - Intuitive course enrollment.
  - Direct receipt of certifications and rewards to user wallets.

### Dyve Savings Platform

![Savings Platform](https://i.imgur.com/1nyTgsi.png)

The **Dyve Savings Platform** offers users a flexible and rewarding savings experience.

#### Key Components

- **Flexible Savings Options**:
  - Support for fiat, cryptocurrencies, and stablecoins.
  - Staking mechanism with various durations.
  - Returns in DYV tokens.

- **On-Ramp Integration**:
  - Integration with services like MoonPay or YellowPay for easy deposits.

- **User Experience and Dashboard**:
  - User-friendly dashboard for monitoring savings.
  - Separate withdrawal options for capital and returns.

- **Cultivating Responsible Spending Habits**:
  - Educational integration emphasizing financial management.
  - Courses on budgeting, investing, and responsible spending.

### Dyve MicroLoan Platform

![MicroLoan Platform](https://i.imgur.com/8ZdkCJ5.png)

The **Dyve MicroLoan Platform** provides users with accessible microloans, secured by digital assets.

#### Key Components

- **Microloan Features**:
  - Automated loan issuance with collateral security.
  - Flexible repayment options in various currencies.

- **User Experience**:
  - Streamlined loan application process.
  - Collateral management through an intuitive dashboard.
  - Automated repayment and liquidation processes.

- **Educational Integration**:
  - Resources on responsible borrowing and collateral management.

---

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed.
- **Hardhat** for smart contract deployment.
- **MetaMask** or any Ethereum-compatible wallet.
- Access to the **Lisk Mainnet** or **Lisk-sepolia Testnet**.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/obah/dyve.git
   ```

2. **Install Dependencies**

   ```bash
   cd dyve
   cd dyve-hardhat
   npm install
   ```

3. **Compile Smart Contracts**

   ```bash
   npx hardhat compile
   ```

4. **Deploy Smart Contracts**

   Update the deployment script with your configurations and run:

   ```bash
   npx hardhat deploy ignition ./ignition/modules/<your_script.ts> --network lisk-sepolia
   ```

---

## Usage

- **Interacting with DyveToken**

  - Minting and burning tokens.
  - Checking balances and transferring DYV tokens.

- **Using the MicroLoan Platform**

  - Supplying funds to the loan pool.
  - Borrowing loans by depositing collateral.
  - Repaying loans and withdrawing yields.

- **Engaging with the MockUsdt**

  - Minting mock USDT for testing.
  - Simulating transactions within the Dyve ecosystem.

---

## Contributing

We welcome contributions from the community. Please follow these steps:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add Your Feature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**


## License

This project is licensed under the **MIT License**.
