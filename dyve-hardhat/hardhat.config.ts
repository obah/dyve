import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    // for testnet
    "lisk-sepolia": {
      url: process.env.LISK_RPC_URL!,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY_DEV!],
      gasPrice: 1000000000,
    },
    lisk: {
      url: 'https://rpc.api.lisk.com',
      accounts: [process.env.ACCOUNT_PRIVATE_KEY_DEV!],
      gasPrice: 1000000000,
    },
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/",
      accounts: [process.env.SWISS_ACCOUNT_PRIVATE_KEY!],
    },
  },
  etherscan: {
    apiKey: {
      "lisk-sepolia": "123",
      lisk: "123",
    },
    customChains: [
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com/",
        },
      },
      {
        network: "lisk",
        chainId: 1135,
        urls: {
          apiURL: "https://blockscout.lisk.com/api",
          browserURL: "https://blockscout.lisk.com",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
