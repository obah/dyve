import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const stakedTokenAddress = "0x223b2DdbF57493ED5B0bC5FeB8d6660fbB698f0C";

const DyvLowStakeModule = buildModule("DyvLowStakeModule", (m) => {
  const savedData = m.contract("DyvLowStake", [stakedTokenAddress]);

  return {savedData};
})

export default DyvLowStakeModule;

// DyvLowStakeModule#DyvLowStake - 0xb2F2A39fB5e334f78C3Ea76E0A53e5C3c8C12542

// https://blockscout.lisk.com/address/0xb2F2A39fB5e334f78C3Ea76E0A53e5C3c8C12542#code