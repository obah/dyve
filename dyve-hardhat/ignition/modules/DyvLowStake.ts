import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const stakedTokenAddress = "0xe6B266d72d16a4C01F0415167De79797d3911421";

const DyvLowStakeModule = buildModule("DyvLowStakeModule", (m) => {
  const savedData = m.contract("DyvLowStake", [stakedTokenAddress]);

  return {savedData};
})

export default DyvLowStakeModule;